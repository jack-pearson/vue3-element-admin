# Vue 3 + Typescript + Vite + element-plus + i18n + pinia + windicss

[在线预览](https://jack-pearson.github.io/vue3-element-admin/)  
欢迎大家 PR 和 Star 各种操作.

## 版本

node 18.16.0

## 功能清单

- [x] 多语言
- [ ] 全屏
- [ ] 内嵌
- [ ] 外链
- [x] 菜单搜索
- [x] element-plus 字体大小(统一调整)
- [ ] 404 页面
- [ ] 一键黑白
- [ ] 固定 footer
- [x] 侧边栏缩进
- [x] 面包屑
- [x] TagsView
- [x] 侧边栏 logo 显示
- [x] vue-router
- [x] pinia
- [x] element-plus(安装 vscode 插件 ---- element-ui-helper, 这样就有了 ts 的 props 提示)
- [x] element-plus 自定义主题. (还可以修改已经自定义好的主题).
- [x] element-plus 自动导入
- [x] windicss
- [x] husky
- [x] svg 组件
- [x] axios 封装类型提示

## 多语言

element-plus + vue-i18n

- 代码主要存放再 `src/i18n/**` 文件中.
- 通过 `el-config-provider` 组件,达到和 `element-plus` UI 库 进行关联.

## 菜单搜索

通过 `src/store/modules/settings.ts` 中的 **config** 对象里面的 `hasSearch` 属性来控制该组件的显示隐藏.

## element-plus 字体大小

- 通过 `el-config-provider` 组件,达到和 `element-plus` UI 库 进行关联.
- 通过 `src/store/modules/settings.ts` 中的 **config** 对象里面的 `hasZiTi` 属性来控制该组件的显示隐藏.

## 侧边栏缩进

- 通过 `src/store/modules/settings.ts` 中的 **config** 对象里面的 `hasClipboard` 属性来控制该组件的显示隐藏.
- 通过 `src/store/modules/settings.ts` 中的 **config** 对象里面的 `isCollapsed` 属性来控制 侧边栏 展开 or 缩进.

## 面包屑

- 通过 `src/store/modules/settings.ts` 中的 **config** 对象里面的 `hasBreadcrumb` 属性来控制该组件的显示隐藏.

## TagsView

- 通过 `src/store/modules/settings.ts` 中的 **config** 对象里面的 `hasTagsView` 属性来控制该组件的显示隐藏.
- 也可以通过页面中主题 <img src="./src/assets/svg/theme.svg" style="width: 20px; height: 20px" /> 来控制显示隐藏

## 侧边栏 logo 显示

- 通过 `src/store/modules/settings.ts` 中的 **config** 对象里面的 `hasSidebarLogo` 属性来控制该组件的显示隐藏.
- 也可以通过页面中主题 <img src="./src/assets/svg/theme.svg" style="width: 20px; height: 20px" /> 来控制显示隐藏

## pinia

因为 **vuex** 没有类型提示, 改用 pinia 来做`状态管理`

## element 自定义主题

1. 再 `src/styles/element/index.scss` 文件中修改对应的颜色.
2. 同时需要修改 `src/store/modules/settings.ts` 文件修改成一致的颜色色值.

**注意** 修改色值之后刷新没有改变,是因为你肯定通过`页面`修改了`主题`

这个操作会记录再 `localStorage` 中. 同时这个优先级比 上面的步骤 `高`.

## windicss

为什么选择 Windi CSS? 呢, 在阐述为什么创建 Windi CSS 时，作者曾说：

> 当项目越来越大时（大约几十个组件），使用 Tailwind CSS 最初的编译时间达到了 3s，而热更新时的时间甚至超过了 1s。 - @voorjaar

官网地址(https://www.tailwindcss.cn/docs/installation)
windicss 是 tailwindcss 的封装.所以详细的需要看 tailwindcss

不用这个的坏处

- 看别人的代码麻烦
- 改别人的代码麻烦
- 样式都集中再一个文件中
- 查找起来很麻烦
- 自己写同样麻烦

## husky

自己研究了一会发现, `lint-staged` npm 包中说明了 只需要一行命令即可.

```bash
npx mrm@2 lint-staged
```

## svg 组件

更换成`vite-plugin-svg-icons`组件使用.

## axios 封装类型提示

根据网上资料, 和自己的判断对 `axios` 进行了封装操作.达到 `传参` 和 `返回值` 有类型提示.  
**例子:** 再 `src/apis/login/index.ts` 中

## 待处理 bug

`点击当前的菜单做刷新功能, tagView 同理` 未做  
`axios` 可以加上无感刷新
