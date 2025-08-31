import { Action } from '@/core/enums/action.enum';
import { Resource } from '@/core/enums/resource.enum';
import { Scope } from '@/core/enums/scope.enum';
import { JwtPayload } from '@/core/interfaces/jwt-payload.interface';
import {
  Permission,
  PermissionCondition,
} from '@/core/interfaces/permission.interface';
import { Role } from '@/features/roles/entities/role.entity';
import { WorkspaceUser } from '@/features/workspace/entities/workspace-user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(WorkspaceUser)
    private readonly workspaceUserRepo: EntityRepository<WorkspaceUser>,

    @InjectRepository(Role)
    private readonly roleRepos: EntityRepository<Role>,
  ) {}

  /**
   * Main permission checking method
   *
   * @param user - The user requesting access
   * @param resource - What they want to access (issue, project, etc.)
   * @param action - What they want to do (create, read, update, delete)
   * @param context - Additional context (workspace, project, issue data)
   * @returns Promise<boolean> - Whether user has permission
   */
  async hasPermission(
    user: JwtPayload,
    resource: Resource,
    action: Action,
    context?: any,
  ): Promise<boolean> {
    // STEP 1: Get all roles this user has in the relevant workspace
    const userRoles = await this.getUserRoles(user.sub, context?.workspaceId);
    Logger.log(userRoles, 'Permission.userRoles');
    // If user has no roles in this workspace, deny access
    if (userRoles.length === 0) {
      return false;
    }
    Logger.log(userRoles, 'userRoles');
    // STEP 2: Check each role's permissions
    // We use OR logic - if ANY role grants permission, allow access
    for (const role of userRoles) {
      const permissions = JSON.parse(role.permissions) as Permission[];
      // const permissions = role.permissions;
      // STEP 3: Check each permission in the role
      for (const permission of permissions) {
        if (
          this.matchesPermission(permission, resource, action, user, context)
        ) {
          return true; // Found matching permission - grant access
        }
      }
    }

    // STEP 4: No matching permissions found - deny access
    return false;
  }

  /**
   * Get all roles a user has in a specific workspace
   */
  private async getUserRoles(
    userId: string,
    workspaceId?: string,
  ): Promise<Role[]> {
    if (!workspaceId) {
      return []; // No workspace context = no permissions
    }

    const workspaceUsers = await this.workspaceUserRepo.find(
      {
        user: userId,
        workspace: workspaceId,
      },
      { populate: ['role'] },
    );

    return workspaceUsers.map((wu) => wu.role);
  }

  /**
   * Check if a specific permission grants access
   * This is where the main permission logic happens
   */
  private matchesPermission(
    permission: Permission,
    requestedResource: Resource,
    requestedAction: Action,
    user: JwtPayload,
    context?: any,
  ): boolean {
    // STEP 1: Check if resource matches
    if (permission.resource !== requestedResource) {
      return false; // Wrong resource type
    }

    // STEP 2: Check if action matches
    // Special case: 'manage' action grants ALL actions on a resource
    if (
      permission.action !== requestedAction &&
      permission.action !== Action.MANAGE
    ) {
      return false; // Wrong action type
    }

    // STEP 3: Check scope (WHO can perform this action)
    if (!this.checkScope(permission.scope, user, context)) {
      return false; // User doesn't meet scope requirements
    }

    // STEP 4: Check additional conditions (WHEN/WHERE)
    if (
      permission.conditions &&
      !this.checkConditions(permission.conditions, user, context)
    ) {
      return false; // Conditions not met
    }

    // All checks passed - permission granted!
    return true;
  }

  /**
   * Check if user meets the scope requirements
   * Scope defines WHO can perform the action
   */
  private checkScope(scope: Scope, user: JwtPayload, context?: any): boolean {
    switch (scope) {
      case Scope.ALL:
        // Universal access - always true if user has this permission
        return true;

      case Scope.OWN:
        // Only resources the user owns/created
        return (
          context?.ownerId === user.sub ||
          context?.creatorId === user.sub ||
          context?.authorId === user.sub
        );

      case Scope.ASSIGNED:
        // Only resources assigned to the user
        return context?.assigneeId === user.sub;

      case Scope.PROJECT:
        // Resources within projects user has access to
        return true;
      // return (
      //   context?.projectId &&
      //   this.userHasProjectAccess(user.sub, context.projectId)
      // );

      case Scope.WORKSPACE:
        // Resources within user's workspace
        return (
          context?.workspaceId &&
          this.userHasWorkspaceAccess(user.sub, context.workspaceId)
        );

      default:
        return false;
    }
  }

  /**
   * Check additional conditions for fine-grained control
   * Conditions define WHEN/WHERE the permission applies
   */
  private checkConditions(
    conditions: PermissionCondition[],
    user: JwtPayload,
    context?: any,
  ): boolean {
    // ALL conditions must be true (AND logic)
    return conditions.every((condition) => {
      // Get the actual value from context using dot notation
      const actualValue = this.getNestedValue(context, condition.field);

      // Interpolate variables like ${user.id} in condition values
      const expectedValue = this.interpolateValue(condition.value, user);

      // Apply the condition operator
      switch (condition.operator) {
        case 'eq':
          return actualValue === expectedValue;

        case 'in':
          return (
            Array.isArray(expectedValue) && expectedValue.includes(actualValue)
          );

        case 'not_in':
          return (
            Array.isArray(expectedValue) && !expectedValue.includes(actualValue)
          );

        case 'exists':
          return actualValue !== undefined && actualValue !== null;

        case 'not_exists':
          return actualValue === undefined || actualValue === null;

        default:
          return false;
      }
    });
  }

  /**
   * Helper: Get nested values from context using dot notation
   * Example: "project.lead_id" gets context.project.lead_id
   */
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => {
      return current?.[key];
    }, obj);
  }

  /**
   * Helper: Replace variables in permission values
   * Example: "${user.id}" becomes actual user ID
   */
  private interpolateValue(value: any, user: JwtPayload): any {
    if (typeof value === 'string' && value.includes('${user.')) {
      return value.replace(/\$\{user\.(\w+)\}/g, (_, prop) => user[prop]);
    }
    return value;
  }

  /**
   * Helper: Check if user has access to specific project
   */
  // private async userHasProjectAccess(
  //   userId: string,
  //   projectId: string,
  // ): Promise<boolean> {
  //   const project = await this.em.findOne(Project, projectId, {
  //     populate: ['workspace'],
  //   });
  //   if (!project) return false;

  //   return this.userHasWorkspaceAccess(userId, project.workspace.id);
  // }

  /**
   * Helper: Check if user is member of workspace
   */
  private async userHasWorkspaceAccess(
    userId: string,
    workspaceId: string,
  ): Promise<boolean> {
    const workspaceUser = await this.workspaceUserRepo.findOne({
      user: userId,
      workspace: workspaceId,
    });

    return workspaceUser !== null;
  }
}
