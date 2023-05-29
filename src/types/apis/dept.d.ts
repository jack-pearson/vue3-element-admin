export interface Dept {
  id: number;
  name: string;
  parentId: number;
  children?: Dept[];
  status?: number;
  description?: string;
}
