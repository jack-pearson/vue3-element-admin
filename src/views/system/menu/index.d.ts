/**
 * Represents a menu item.
 */
type MenuItem = {
  /** 菜单id */
  id?: number
  /** 父级菜单id */
  parentId?: number
  /** 菜单标题 */
  title: string
  /** 菜单name */
  name: string
  /** 菜单路径 */
  path?: string
  /** 组件地址 */
  component?: string
  /** 菜单排序 */
  sort: number
  /** 菜单状态 */
  status?: '正常' | '停用'
  /** 菜单类型 */
  type?: '目录' | '菜单' | '按钮'
  /** 菜单icon */
  icon?: string
  /** 是否缓存 */
  cache?: boolean
  /** 是否隐藏 */
  hidden?: boolean
  /** 是否重定向 */
  redirect?: string
  /** 创建时间 */
  createTime?: Date
  /** 更新时间 */
  updateTime?: Date
  /** 子菜单 */
  children?: MenuItem[]
  /** 是否固定tagView */
  isAffix?: boolean
  /** 是否显示tagView */
  isTagView?: boolean
}
