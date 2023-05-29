export interface HttpGlobalResponse<T = any> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}

export interface PageInfo {
  pageNum: number;
  pageSize: number;
  total: number;
}
