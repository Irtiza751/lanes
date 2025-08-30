export enum Action {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage', // Full control
  ASSIGN = 'assign',
  TRANSITION = 'transition', // For workflow status changes
  EXPORT = 'export',
  INVITE = 'invite',
}
