import { createRouter, createWebHistory, isNavigationFailure } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import { routerStore } from '@/store'
import 'nprogress/nprogress.css'
import { Session } from '@/utils'
import { route } from '@/hooks'

const DEFAULT_PATH = '/home'
import Login from '@/views/login/index.vue'
import Layout from '@/layout/index.vue'
import Redirect from '@/views/redirect/index.vue'
import PageNotFound from '@/components/pageNotFound/index.vue'

NProgress.configure({ showSpinner: false })
export const constantRouters: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: 'login', isTagView: false }
  },
  {
    path: '/',
    name: '/',
    redirect: { path: DEFAULT_PATH },
    component: Layout,
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: { title: 'profile', icon: 'profile' }
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: 'home', icon: 'home', isAffix: true, isTagView: true }
      }
      // 404 页面没搞好.
    ]
  },
  {
    path: '/redirect',
    name: 'redirectTo',
    component: Layout,
    redirect: '/redirect/:path(.*)',
    meta: {
      title: 'redirect'
    },
    children: [
      {
        children: [],
        path: '/redirect/:path(.*)',
        name: 'redirect',
        component: Redirect,
        meta: {
          title: 'redirect'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRouters
})

router.beforeEach(async (to, from, next) => {
  const store = routerStore()
  const { routerList, getRouterList } = store
  const token = Session.get('token')
  NProgress.start()

  if (to.path === '/login') {
    NProgress.done()
    return next()
  }

  if (!token) {
    const params = JSON.stringify(to.query ? to.query : to.params)
    const url = `/login?redirect=${to.path}&params=${params}`
    return next(url)
  }

  if (routerList.length > 0) return next()

  try {
    const newRouter = await getRouterList()
    newRouter.forEach((item) => router.addRoute(item as unknown as RouteRecordRaw))
    router.addRoute({
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: PageNotFound,
      meta: { title: 'notFound', isTagView: false }
    })
    next({ ...to, replace: true })
  } catch (err) {
    console.log(err, '动态添加路由失败')
    NProgress.done()
  }
})

// 路由加载后
router.afterEach((to, from, failure) => {
  route.value = to
  if (isNavigationFailure(failure)) {
    NProgress.done()
    console.log('error navigation', failure)
  } else {
    document.title = router.currentRoute.value.meta.title as string
    NProgress.done()
  }
})
export default router
