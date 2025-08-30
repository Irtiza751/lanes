import { Action } from '../enums/action.enum';
import { Resource } from '../enums/resource.enum';
import { Scope } from '../enums/scope.enum';

export interface Permission {
  resource: Resource;
  action: Action;
  scope: Scope;
  conditions?: PermissionCondition[];
}

export interface PermissionCondition {
  field: string;
  operator: 'eq' | 'in' | 'not_in' | 'exists' | 'not_exists';
  value: any;
}
