# diva-sdk Demo

该项目为调用 diva-sdk 接口的案例

## 下载

```javascript
git clone https://sheencity-bj@dev.azure.com/sheencity-bj/psg/_git/subtree-test-b
```

## 安装依赖

安装依赖需要 `npm@v7.0.0` 以上，安装 `node` 之后，运行 `npm -v` 查看 `npm` 版本，若 `npm` 版本大于 `v7.0.0`, 可直接安装依赖。若版本低于 `v7.0.0`, 运行 `npm install npm -g` 升级 `npm`,  `npm` 升级完之后再运行 `npm -v` 查看 `npm` 版本, `npm` 版本大于 `v7.0.0` 即可进行安装依赖操作。

```javascript
npm install
```

## 运行项目

```javascript
npm start
```

项目将运行在 `http://localhost:4200/`，修改任何源代码均会触发页面的重载。

## 打包项目

```javascript
npm build
```

打包文件将存储在 `dist/` 目录中，可以通过添加 `--prod` 标记打包生产环境文件
