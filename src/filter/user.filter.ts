export const sexFilter = (value: any) => {
  const obj = {
    null: "未知",
    man: "男",
    girl: "女",
  };
  return obj[value as keyof typeof obj];
};
