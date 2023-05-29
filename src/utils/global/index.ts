export const hasLength = (target: Array<any>) => target && target.length > 0;

/** element 组件的全局配置size  因为这个是全局的,故写在于此 */
export const componentSize = ["large", "default", "small"] as const;

/** 国际化 因为这个是全局的,故写在于此 */
export const i18n = [
  {
    label: "简体中文",
    value: "zh-cn",
  },
  {
    label: "English",
    value: "en",
  },
] as const;

export const treeToArray = <T>(tree: T[]) => {
  let res: T[] = [];
  for (const item of tree) {
    const { children, ...i } = item as any;
    if (children && children.length) {
      res = res.concat(treeToArray(children));
    }
    res.push(i);
  }
  return res;
};
