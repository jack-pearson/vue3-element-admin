export type IRole = {
  createTime?: string
  description?: string
  id?: number
  name: string
  status: 0 | 1
  updateTime?: string
  permissionIds: number[]
}
