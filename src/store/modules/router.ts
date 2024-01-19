import { defineStore } from 'pinia'
import type { IRouter, RouterStoreTypes } from '@/types'
import { formatRoutes } from '@/utils'
import { SystemMenuService } from '@/apis'

export const createRouter = (): RouterStoreTypes => {
  return {
    routerList: []
  }
}

export const routerStore = defineStore('routerStore', {
  state: createRouter,
  actions: {
    getRouterList(): Promise<IRouter[]> {
      return new Promise((resolve, reject) => {
        SystemMenuService.getUserMenu()
          .then(({ data, code }: any) => {
            if (code === 200) {
              const newRoute = formatRoutes(data)
              this.routerList = newRoute
              resolve(newRoute)
            } else {
              reject(data)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
})
