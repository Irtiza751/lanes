export enum Roles {
  /**
   * @description
   * The user who created the task.
   * Permissions:
   *  - Full CRUD access to their tasks
   *  - Add/remove collaborators
   *  - Assign tags
   *  - View activity logs
   */
  OWNER = 'owner',
  /**
   * @description
   * A user who has been invited to collaborate on a task.
   *  - View and update task status/description
   *  - Add comments (if supported)
   *  - Cannot delete the task or manage other collaborators
   *  - Cannot change due date or priority (optional restriction)
   */
  MEMBER = 'member',
}
