import type { User } from '@/types'
import { request } from '@/utils'
export class SystemUserService {
  public static async query(data) {
    return request({
      url: 'admin/v1/user/query',
      method: 'get',
      params: data
    })
  }

  public static async create(data: User) {
    return request({
      url: 'admin/v1/user/create',
      method: 'post',
      data
    })
  }

  public static async update(data: User) {
    return request({
      url: 'admin/v1/user/update',
      method: 'post',
      data
    })
  }

  public static async delete(id: User['id']) {
    return request({
      url: `admin/v1/user/delete/${id}`,
      method: 'delete'
    })
  }
}
