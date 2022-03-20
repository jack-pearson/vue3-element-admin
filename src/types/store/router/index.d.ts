/*
 * @Author: jack-pearson
 * @Date: 2021-12-14 14:07:07
 * @LastEditTime: 2022-03-16 14:42:42
 * @LastEditors: jack-pearson
 * @FilePath: /vue3-element-admin/src/types/store/router/index.d.ts
 * @Description:  https://github.com/jack-pearson/vue3-element-admin
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
  meta: {
    title: string;
    icon: string;
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
