# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


## 打包：
#### 1.在根目录运行npm run build，把c端项目打包至，'./server/public/dist' 命令下
#### 2.进入server目录，运行 npm run build, 把服务端代码打包
#### 3.继续在server目录运行，npm run prod, 访问本地链接：http://127.0.0.1:3000/web

#### 服务端部署，把步骤3，改为pm2: node ./dist/bin/www