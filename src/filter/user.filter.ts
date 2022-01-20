/*
 * @Author: jack-pearson
 * @Date: 2022-01-19 16:25:37
 * @LastEditTime: 2022-01-19 16:37:26
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/filter/user.filter.ts
 * @Description:
 */

export const sexFilter = (value: any) => {
  const obj = {
    null: "未知",
    man: "男",
    girl: "女",
  };
  return obj[value as keyof typeof obj];
};
