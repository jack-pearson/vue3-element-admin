/*
 * @Author: jack-pearson
 * @Date: 2022-01-19 16:25:37
 * @LastEditTime: 2022-01-19 16:37:26
 * @LastEditors: jack-pearson
 * @FilePath: /vue3-element-admin/src/filter/user.filter.ts
 * @Description:  https://github.com/jack-pearson/vue3-element-admin
 */

export const sexFilter = (value: any) => {
  const obj = {
    null: "未知",
    man: "男",
    girl: "女",
  };
  return obj[value as keyof typeof obj];
};
