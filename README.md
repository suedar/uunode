# uunode

<del>一款老少咸宜的游戏🎮</del>

一个将 `js` 转化为 `mjs`，从而方便调试的小工具。

### 一、概述

`Node verison 13.2.0` 起开始正式支持 `ES Modules` 特性，有两种方法可以应用：
1. 在 `package.json` 中设置 `"type": "module"`
2. 将文件后缀改变为 `mjs`

根据第二个方法，为了便利化调试，我开发了一个命令行工具—— [uunode](https://github.com/suedar/uunode#readme)，它会将 `js`文件自动转化自动转化为 `mjs`,  并执行相应的返回结果。

注意：
1. 若不添加上述两项中任一项，直接在 Node 中使用 ES Modules，则会抛出警告：

> Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.

2. 根据 `ESM` 规范，使用`import` 关键字并不会像 `CommonJS` 模块那样，在默认情况下以文件扩展名填充文件路径。因此，`ES Modules` 必须明确文件扩展名
###  二、安装

`npm` 使用：

> npm install uunode -g

`yarn` 使用：

> yarn add uunode -g

(`linux` 显示没有权限的话请在前面加上 sudo, 即 `sudo npm install uunode -g `或者 `sudo yarn add uunode -g`)


### 三、使用示例

> uunode [example.js]

![2021-06-24_2281841392291411363 33 52](https://user-images.githubusercontent.com/18492953/123364705-80ace000-d5a7-11eb-97d1-fc5ea2378929.gif)


如示例所示，当我们运行 `uunode [example.js]` 时，它会产生一个 `.uunode` 的文件夹，里面储存着将 `mjs ` 文件（默认不保留文件，你可以加 `-k` 参数保留文件）。并执行 `node .uunode/example.js` 返回相应的结果。

你还可以使用 `uunode [example.js] -s` 去掉 `console`。

参数支持项：

| 参数值 | 含义             |
| ------ | ---------------- |
| -s     | 去除 `console`   |
| -k     | 保留生产后的菜单 |


### 四、更多

1. [手把手教你写Node.js命令行程序](https://juejin.cn/post/6844904095065587725)

2. [如何从零开始开发一个 node.js 命令行(cli)工具](https://juejin.cn/post/6883070890130145288#heading-11)

3. [什么是amd、commonjs、umd、esm?](https://zhuanlan.zhihu.com/p/96718777)

4. [2020年我们可以在Node中使用ES Modules了吗](https://zhuanlan.zhihu.com/p/337796076)
