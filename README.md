## fedao

![](https://img.shields.io/npm/v/fedao.svg) ![](https://img.shields.io/npm/dm/fedao.svg)

**![fedao](./docs/logo.png) 学而思在线前端工程构建工具**

### 主要特征

- 基于fis3的前端工程化解决方案
- 全面支持es6/es7
- 支持npm生态
- 支持智能打包
- 内置 `autoprefixer`、`px2rem` 等实用插件
- 数据mock
- http远程部署
- git分支远程部署
- 代码区块裁剪

### 安装

```
npm install -g fedao
```

### 主要命令

```
fedo server start|stop|restart|open
fedao release -cw //发布
```

### 数据模拟

参见[数据模拟](./docs/mock.md)

### git分支远程部署

用于将编译好的源码推送到指定的git分支。适用于上线系统无前端编译机器的场景。

#### 配置

```js
// deploy.url值为数组，内容为分支地址及分支名称
fis.set('deploy.url', [{
    url: 'https://git.coding.net/younth/hexo-site.git',
    branch: 'master',
}, {
    url: 'http://111.204.113.135:8000/wangyang02/docs.git',
    branch: 'master'
}])
```


#### 使用方法

- 本地编译产出 `output` 目录。**注意产出目录必须为output**
- 执行 `fedao deploy` 即可将output内容通过git的方式自动提交到对应的分支。


#### Notice 
 
 - 提交的过程会新建一个`.deploy_git`分支，可在.gitignore里面配置忽略～
 - 提交的分支不能是受保护的分支，否则会提交失败。gitlab设置：设置 -> 保护分支

### todo

- 基于laravel的后端解决方案封装
- 基于node的中间层解决方案封装