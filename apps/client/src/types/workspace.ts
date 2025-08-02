export interface Workspace {
  id: number;
  slug: string;
  ownerId: string;
  name: string;
  logoUrl: string;
  color: string;
  description?: string;
}
