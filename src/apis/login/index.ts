import { request } from '@/utils'
import type { User } from '@/types'
export class LoginService {
  public static async login(data) {
    return request<User>({
      url: '/user/login/web',
      method: 'post',
      data
    })
  }
}
