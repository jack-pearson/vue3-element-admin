import { PageInfo } from '@/types'
type sexType = 'null' | 'man' | 'girl'
export interface User {
  account: string
  token?: string
  password: string
  name: string
  avatar?: string
  email?: string
  mobile?: string
  phone?: string
  age?: number
  sex?: sexType
  /** 用户状态 0: 禁用 1: 正常 */
  status: '0' | '1'
  description?: string
  [key: string]: any
}

export interface userStoreTypes {
  userInfo: User
}

export type UserList = PageInfo & {
  list: User[]
}
