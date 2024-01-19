import type { RouteRecordRaw } from 'vue-router'

type IRouterMeta = {
  title: string
  icon?: string
  /** 是否缓存 */
  cache?: '0' | '1'
  /** 是否隐藏 */
  hidden?: '0' | '1'
  /** 是否固定tagView */
  isAffix?: '0' | '1'
  /** 是否显示tagView */
  isTagView?: '0' | '1'
}
export type IRouter = RouteRecordRaw & { meta: IRouterMeta }

export interface RouterStoreTypes {
  routerList: IRouter[]
}
