import { ACTION_KEY, RESOURCE_KEY } from '@/core/constants';
import { JwtPayload } from '@/core/interfaces/jwt-payload.interface';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { logger } from 'handlebars';
import { Observable } from 'rxjs';
import { PermissionService } from '../services/permission.service';
import { Resource } from '@/core/enums/resource.enum';
import { Action } from '@/core/enums/action.enum';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionService: PermissionService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    const requestedResource = this.reflector.get<Resource>(
      RESOURCE_KEY,
      context.getHandler(),
    );
    const requestedAction = this.reflector.get<Action>(
      ACTION_KEY,
      context.getHandler(),
    );
    Logger.log(user, 'PermissionGuard.user');
    Logger.log(requestedResource, 'PermissionGuard.requestedResource');
    Logger.log(requestedAction, 'PermissionGuard.requestedAction');

    return this.permissionService.hasPermission(
      user,
      requestedResource,
      requestedAction,
      {
        workspaceId: '63ebb8d6-d1d8-4586-82fb-4cf455e20767',
      },
    );
  }
}
