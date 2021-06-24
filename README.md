# uunode

<del>一款老少咸宜的游戏🎮</del>

一个将 `js` 转化为 `mjs`，从而方便调试的小工具。

### 一、概述

`node` 可以运行 `ESM` 吗，自然是可以的，我们需要把文件后缀更改为 `mjs`，然后就可以直接在 `node` 环境运行 `ESM` 了。

但是在调试代码的过程中，文件与文件之间往往有很多引用，并且来回改动文件的后缀是很不方便的。

为了便利化调试，我开发了一个命令行工具—— [uunode](https://github.com/suedar/uunode#readme)，它会将 `js`文件自动转化自动转化为 `mjs`,  并执行相应的返回结果。



###  二、安装

npm 使用：

> npm install uunode -g

yarn 使用：

> yarn add uunode -g


### 三、使用示例

> uunode [example.js]

![2021-06-24_2281841392291411363.33.52](/Users/chao.sun/Downloads/2021-06-24_2281841392291411363.33.52.gif)

参数支持项：
|  参数值   | 含义  |
|  ----  | ----  |
| -s  | 去除 `console` |
| -k  | 保留生产后的菜单 |

该 `node` 命令行工具会将 `js` 文件转化为 `mjs`，并找到相应的引用文件，将引用文件转化，并存储在 `.uunode` 文件夹目录下。


### 四、更多

[手把手教你写Node.js命令行程序](https://juejin.cn/post/6844904095065587725)

[如何从零开始开发一个 node.js 命令行(cli)工具](https://juejin.cn/post/6883070890130145288#heading-11)

[什么是amd、commonjs、umd、esm?](https://zhuanlan.zhihu.com/p/96718777)