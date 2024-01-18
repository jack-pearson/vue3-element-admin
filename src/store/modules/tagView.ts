import { defineStore } from 'pinia'
import type { IRouter, TagViewStoreType } from '@/types'
import { router } from '@/hooks'
export const createTagView = (): TagViewStoreType => {
  return {
    visitedViews: [],
    cachedViews: []
  }
}

export const tagViewStore = defineStore('tagViewStore', {
  state: createTagView,
  actions: {
    addVisitedViews(route: IRouter) {
      if (this.visitedViews.length === 0) {
        this.visitedViews.push({ name: 'home', path: '/home', meta: { title: '首页', isAffix: true, isTagView: true } })
      }
      if (this.visitedViews.find((item) => item.name === route.name)) return
      this.visitedViews.push(route)
      // 对 visitedViews 进行排序. isAffix 为 true 的排在前面.使用循环的方式
      const visitedViews = this.visitedViews
      const affixList: IRouter[] = []
      const noAffixList: IRouter[] = []
      visitedViews.forEach((item) => {
        if (item.meta.isAffix) {
          affixList.push(item)
        } else {
          noAffixList.push(item)
        }
      })
      this.visitedViews = [...affixList, ...noAffixList]
    },
    addCachedViews(route: IRouter) {
      if (this.cachedViews.includes(route.name)) {
        if (route.meta.isKeepAlive) return
        this.removeCachedViews(route.name as string)
      } else {
        this.cachedViews.push(route.name)
      }
    },
    removeVisitedViews(route: IRouter) {
      this.visitedViews = this.visitedViews.filter((v) => v.name !== route.name)
    },
    removeCachedViews(name: string) {
      this.cachedViews = this.cachedViews.filter((v) => v !== name)
    },
    addTagView(route: IRouter) {
      console.log(route, 'addTagView')
      this.addCachedViews(route)
      this.addVisitedViews(route)
    },
    closeLeftTagView(route: IRouter) {
      const findIndex = this.visitedViews.findIndex((item) => item.name === route.name)
      this.visitedViews = this.visitedViews.filter((item, index) => {
        if (item.meta.isAffix) return item
        if (index >= findIndex) {
          return item
        }
      })
      router.value.push(route)
    },
    closeRightTagView(route: IRouter) {
      const findIndex = this.visitedViews.findIndex((item) => item.name === route.name)
      this.visitedViews = this.visitedViews.filter((item, index) => {
        if (item.meta.isAffix) return item
        if (findIndex >= index) {
          return item
        }
      })
      router.value.push(route)
    },
    closeOtherTagView(route: IRouter) {
      const emitAffixList = this.visitedViews.filter((item) => item.meta.isAffix)
      this.visitedViews = emitAffixList
      router.value.push(route)
    },
    closeAllTagView() {
      this.visitedViews = this.visitedViews.filter((item) => item.meta.isAffix)
    }
  }
})
