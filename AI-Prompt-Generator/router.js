const express = require("express");
const DemoService = require("./demo.js");
// 创建路由容器
const router = express.Router(); // 挂载路由

// 显示所有的案例数据
router.get("/demoList", function (req, res) {
  DemoService.find(function (err, data) {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }
    res.render("demoList.html", { demoList: data });
  });
});

// 页面跳转到添加案例的页面
router.get("/demoList/new", function (req, res) {
  res.render("newDemo.html");
});

// 添加案例页面提交数据以后将数据保存到json文件中，然后跳转到主页面
router.post("/demoList", function (req, res) {
  console.log("post", req.body);
  DemoService.save(req.body, function (err) {
    if (err) {
      return res.status(500).send("Server Error");
    }
    res.redirect("/demoList");
  });
});

// 点击编辑的时候跳转到编辑页面 同时根据点击的案例进行查询信息 显示在页面上
router.get("/demoList/edit", function (req, res) {
  const id = req.query.id;
  DemoService.find(function (err, data) {
    const demo = data.filter((item) => parseInt(item.id) === parseInt(id));
    res.render("updateDemo.html", { demo: demo[0] });
  });
});

// 修改案例数据提交后，修改案例在json文件中的数据 然后跳转到主页面
router.post("/demoList/edit", function (req, res) {
  DemoService.update(req.body, function (err) {
    if (err) {
      return res.status(500).send("Server Error");
    }
    res.redirect("/demoList");
  });
});

// 点击删除以后根据案例id进行删除数据
router.get("/demoList/delete", function (req, res) {
  const id = req.query.id;
  DemoService.delete(id, function (err) {
    if (err) {
      return res.status(500).send("Server Error");
    }
    res.redirect("/demoList");
  });
});

// 导出
module.exports = router;
