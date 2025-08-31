export enum Scope {
  ALL = 'all',
  OWN = 'own', // Only resources user owns/created
  ASSIGNED = 'assigned', // Only resources assigned to user
  PROJECT = 'project', // Within user's projects
  WORKSPACE = 'workspace', // Within user's workspace
}
