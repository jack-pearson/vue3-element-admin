import type { IMenuItem, IRouter } from '@/types'
const modules = import.meta.glob('/src/**/**.vue')
console.log(modules)
/** 对数组进行 component 转换 */
export const formatRoutes = (data: IMenuItem[]): IRouter[] => {
  return data.map((v) => {
    const children = v.children ? formatRoutes(v.children) : []
    const component = (() => {
      if (v.component === 'Layout') return () => import(`@/layout/index.vue`)
      else if (v.component === 'ParentView') return () => import(`@/components/parentView/index.vue`)
      else return modules[v.component]
    })() as unknown as string
    return {
      ...v,
      meta: {
        cache: v.cache,
        hidden: v.hidden,
        isAffix: v.isAffix,
        isTagView: v.isTagView,
        icon: v.icon,
        title: v.title
      },
      children,
      component
    }
  })
}

export const isHide = (route: IRouter) => route && route.meta && route.meta.hidden === '1'

export const hasChildren = (route: IRouter) => route && route.children && route.children.length > 0

export const routeTreeToArray = (routes: IRouter[], result: IRouter[] = []) => {
  routes.forEach((node: IRouter) => {
    result.push(node)
    if (hasChildren(node) && !isHide(node)) routeTreeToArray(node.children, result)
  })
  return result
}
