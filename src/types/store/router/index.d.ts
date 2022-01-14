/*
 * @Author: jack-pearson
 * @Date: 2021-12-14 14:07:07
 * @LastEditTime: 2022-01-14 19:00:45
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/types/store/router/index.d.ts
 * @Description:
 */
export interface Menu {
  id?: number;
  parentId?: number;
  name: string;
  path: string;
  redirect: string;
  component: any;
  children: Menu[];
  isHide?: boolean;
  meta?: {
    title?: string;
    icon?: string;
    isKeepAlive?: boolean;
    isTagView?: boolean;
    isAffix?: boolean;
  };
  sort?: number;
  createTime?: Date;
  updateTime?: Date;
}

export interface RouterStoreTypes {
  routerList: Menu[];
}
