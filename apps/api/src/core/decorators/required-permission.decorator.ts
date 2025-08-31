import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Action } from '../enums/action.enum';
import { Resource } from '../enums/resource.enum';
import { ACTION_KEY, RESOURCE_KEY } from '../constants';
import { PermissionGuard } from '@/common/guards/permission.guard';

export const RequiredPermission = (resource: Resource, action: Action) => {
  return applyDecorators(
    SetMetadata(RESOURCE_KEY, resource),
    SetMetadata(ACTION_KEY, action),
    UseGuards(PermissionGuard),
  );
};
