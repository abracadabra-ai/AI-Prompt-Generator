### 单独启动前端C端服务
1. 在对应c端项目下运行npm run build打包 dist文件夹
```
npm run build
```
2. 编辑node文件 nodeServer.js 启动一个app.listen监听 dist文件夹
```node
const express = require('express')
const app = express()


app.use(express.static('./dist'))

app.listen(8080, () => {
  console.log('server running at http://127.0.0.1:8080')
})
```
3. 目录结构如下：

### 单独启动express服务端
1. express的入口文件app.js，创建一个后端服务
```node
import express from "express";
import path from "path";
import cors from "cors";
import logger from "morgan";
import router from "./routes/index";

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", router);

export default app;
```
2. 创建后端路由对象 router
``` node
import category from "./category.js";
import card from "./card.js";

// 创建一个router
const router = express.Router();

router.use("/category", category);
router.use("/card", card);

export default router;
```
3. 路由文件 category.js
``` node
import express from "express";
// 定义类型
import { responseClient } from "../utils/index.js";

const router = express.Router();

// 获取列表
router.get("/list", (req, res) => {
  ...
    if (err) {
      responseClient(res, 500, -10000, "服务端异常", null);
      return;
    }
    responseClient(res, 200, 0, "成功", data);
  ...
});
```
4. 封装返回对象 utils/index.js
```node
module.exports = {
  responseClient(
    res,
    httpCode = 500,
    code = 3,
    message = "服务器错误",
    data = null
  ) {
    let responseData = {};
    responseData.code = code;
    responseData.message = message;
    responseData.data = data;
    res.status(httpCode).json(responseData);
  },
};
```
5. 启动服务访问的web.js
``` node
import app from '../app.js'; // 入口文件app.js

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port); // 3000端口
var server = http.createServer(app);

...
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

...
// 监听提示
function onListening() {
  var addr = server.address();
  console.log(`启动成功 127.0.0.1:${addr.port}`);
}
```
6. 进入web.js所在文件夹用node启动
```
node ./web.js
```

### express服务端和C端一起打包
1.只需要在后端app.js中加上一个前端路由 /web ，指向C端打包好的dist文件夹
```node
import express from "express";
import path from "path";
import cors from "cors";
import logger from "morgan";
import router from "./routes/index";

const app = express();

// 服务端相关
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", router);

// C端打包
app.use("/web", express.static(path.join(__dirname, "../public/dist")));

export default app;
```
2. 启动 node ./web.j 后可以看到效果，C端和B端都在同一服务下
