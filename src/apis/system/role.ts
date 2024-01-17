import type { IRole } from '@/types'
import { request } from '@/utils'
export class SystemRoleService {
  public static async query(data) {
    return request({
      url: '/role/query',
      method: 'get',
      params: data
    })
  }
  public static async querySelect() {
    return request({
      url: '/role/querySelect',
      method: 'get'
    })
  }
  public static async create(data) {
    return request({
      url: '/role/create',
      method: 'post',
      data
    })
  }
  public static async update(data) {
    return request({
      url: '/role/update',
      method: 'post',
      data
    })
  }

  public static async delete(id: IRole['id']) {
    return request({
      url: `/role/delete/${id}`,
      method: 'delete'
    })
  }
}
