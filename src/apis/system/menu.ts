import { request } from '@/utils'
export class SystemMenuService {
  public static async create(data) {
    return request({
      url: 'admin/v1/menu/create',
      method: 'post',
      data
    })
  }
  public static async update(data) {
    return request({
      url: 'admin/v1/menu/update',
      method: 'post',
      data
    })
  }
  public static async delete(id) {
    return request({
      url: `admin/v1/menu/delete/${id}`,
      method: 'delete'
    })
  }
  public static async findTreeList(data?: any) {
    return request({
      url: 'admin/v1/menu/findTreeList',
      method: 'get',
      params: data
    })
  }
  public static async getUserMenu() {
    return request({
      url: 'admin/v1/menu/getUserMenu',
      method: 'get'
    })
  }
}
