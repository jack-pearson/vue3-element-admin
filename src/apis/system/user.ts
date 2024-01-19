import type { User } from '@/types'
import { request } from '@/utils'
export class SystemUserService {
  public static async query(data) {
    return request({
      url: '/user/query',
      method: 'get',
      params: data
    })
  }

  public static async create(data: User) {
    return request({
      url: '/user/create',
      method: 'post',
      data
    })
  }

  public static async update(data: User) {
    return request({
      url: '/user/update',
      method: 'post',
      data
    })
  }

  public static async delete(id: User['id']) {
    return request({
      url: `/user/delete/${id}`,
      method: 'delete'
    })
  }
}
