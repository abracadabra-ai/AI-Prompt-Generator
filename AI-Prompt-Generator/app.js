const express = require('express')
const app = new express()
const router = require('./router.js')
const bodyParser = require('body-parser')
// 使用body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// 把模板引擎加载到express
app.engine('html', require('express-art-template')) 
// 处理静态文件
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))
// 使用路由
app.use(router)
// 项目启动端口设置
app.listen(3000, () => {console.log('启动成功 127.0.0.1:3000')
})