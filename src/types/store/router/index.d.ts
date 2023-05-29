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
