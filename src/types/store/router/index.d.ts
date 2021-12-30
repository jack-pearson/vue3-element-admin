/*
 * @Author: jack-pearson
 * @Date: 2021-12-14 14:07:07
 * @LastEditTime: 2021-12-30 17:26:49
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/types/store/router/index.d.ts
 * @Description:
 */
export type DbBoolean = 0 | 1;

export interface Menu {
  id?: number;
  parentId?: number;
  name: string;
  path: string;
  redirect: string;
  component: any;
  children: Menu[];
  isHide: DbBoolean;
  meta: {
    title: string;
    icon: string;
    isKeepAlive: DbBoolean;
  };
  sort?: number;
  createTime?: Date;
  updateTime?: Date;
}

export interface RouterStateTypes {
  routerList: Menu[];
}
