/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 16:13:39
 * @LastEditTime: 2021-11-24 16:24:28
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/store/index.ts
 * @Description:
 */
import { RootStateTypes } from "types/store";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

// Vite supports importing multiple modules from the file system using the special import.meta.glob function
// see https://cn.vitejs.dev/guide/features.html#glob-import
const modulesFiles = import.meta.globEager("./modules/*.ts");
const pathList: string[] = [];

for (const path in modulesFiles) {
  pathList.push(path);
}

const modules = pathList.reduce(
  (modules: { [x: string]: any }, modulePath: string) => {
    const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, "$1");
    const value = modulesFiles[modulePath];
    modules[moduleName] = value.default;
    return modules;
  },
  {}
);

export const key: InjectionKey<Store<RootStateTypes>> = Symbol();

export const store = createStore<RootStateTypes>({ modules });

export function useStore() {
  return baseUseStore(key);
}
