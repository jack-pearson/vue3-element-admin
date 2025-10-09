import type { IRole } from '@/types'
import { request } from '@/utils'
export class SystemRoleService {
  public static async query(data) {
    return request({
      url: 'admin/v1/role/query',
      method: 'get',
      params: data
    })
  }
  public static async querySelect() {
    return request({
      url: 'admin/v1/role/querySelect',
      method: 'get'
    })
  }
  public static async create(data) {
    return request({
      url: 'admin/v1/role/create',
      method: 'post',
      data
    })
  }
  public static async update(data) {
    return request({
      url: 'admin/v1/role/update',
      method: 'post',
      data
    })
  }

  public static async delete(id: IRole['id']) {
    return request({
      url: `admin/v1/role/delete/${id}`,
      method: 'delete'
    })
  }
}
