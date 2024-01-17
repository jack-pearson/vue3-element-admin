export type IMenuItem = {
  /** 菜单id */
  id?: number
  /** 父级菜单id */
  parentId: number
  /** 菜单类型 */
  type: 'menu' | 'button'
  /** 菜单状态 */
  status: 0 | 1
  /** 菜单标题 */
  title?: string
  /** 菜单name */
  name?: string
  /** 菜单路径 */
  path?: string
  /** 组件地址 */
  component?: string
  /** 是否重定向 */
  redirect?: string
  /** 菜单排序 */
  sort?: number
  /** 菜单icon */
  icon?: string
  /** 是否缓存 */
  cache?: 0 | 1
  /** 是否隐藏 */
  hidden?: 0 | 1
  /** 是否固定tagView */
  isAffix?: 0 | 1
  /** 是否显示tagView */
  isTagView?: 0 | 1
  /** 权限标识 */
  permission?: string
  /** 创建时间 */
  createTime?: Date
  /** 更新时间 */
  updateTime?: Date
  /** 子菜单 */
  children: MenuItem[]
}
