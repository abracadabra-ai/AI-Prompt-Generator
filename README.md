# AI-Prompt-Generator

AI-Prompt-Generator 是一个开源项目，旨在提供管理和生成MidJourney 和 StableDiffusion的prompt的功能。AI-Prompt-Generator 提供一个简单易用的界面，让用户能够轻松地创建、保存和管理他们的prompt，并优化其效果。

AI-Prompt-Generator is an open-source project that provides functionalities for managing and generating MidJourney or StableDiffusion prompts. It offers a user-friendly interface for users to easily create, save, and manage their prompts, and optimize their effects. Suitable for various applications of generated text.

![image](https://github.com/abracadabra-ai/AI-Prompt-Generator/blob/18c752675fe2ce6e73c7c30dcbb03577fbdc52ef/public/example.png)

## Feature List
- ✅ Support 魔法词(prompt)管理
- ✅ Support 案例管理
- ✅ Support 自动翻译


## Quick Start

以下是本项目的部署步骤：

### 客户端部署
在项目的根目录中运行以下命令，将客户端项目打包至 './server/public/dist' 目录下。

   ```
   npm install
   npm run build
   ```

### 服务端部署
 切换到 'server' 目录，运行以下命令，将服务端代码进行打包。

   ```
   cd server
   npm install
   npm run build
   ```

#### 本地运行
在 'server' 目录中继续运行以下命令，本地启动服务。（本地测试或者开发）

   ```
   npm run prod
   ```
   然后可以通过访问以下本地链接进行测试：http://127.0.0.1:3000/

#### 使用 PM2 进行部署
如果你想使用 PM2 来进行服务器部署，在 'server' 目录中继续运行以下命令（PM2 请自行安装）：

   ```
   pm2 start node ./dist/bin/www
   ```

请注意，以上所有的命令都需要在命令行工具（如终端或者 CMD）中执行。
