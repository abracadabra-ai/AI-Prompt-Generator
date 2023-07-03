# AI-Prompt-Generator

AI-Prompt-Generator 是一个开源项目，旨在提供管理和生成prompt的功能。AI-Prompt-Generator 提供一个简单易用的界面，让用户能够轻松地创建、保存和管理他们的prompt，并优化其效果。适用于各种生成文本的应用场景。

AI-Prompt-Generator is an open-source project that provides functionalities for managing and generating prompts. It offers a user-friendly interface for users to easily create, save, and manage their prompts, and optimize their effects. Suitable for various applications of generated text.

## 打包：
#### 1.在根目录运行npm run build，把c端项目打包至，'./server/public/dist' 命令下
#### 2.进入server目录，运行 npm run build, 把服务端代码打包
#### 3.1 继续在server目录运行，npm run prod, 访问本地链接：http://127.0.0.1:3000/web

#### 3.2 服务端部署，把步骤3，改为pm2 start node ./dist/bin/www