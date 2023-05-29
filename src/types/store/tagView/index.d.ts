import { Menu } from "../router";
export interface TagViewStoreType {
  visitedViews: Array<Menu>;
  cachedViews: Array<Menu["name"]>;
}
