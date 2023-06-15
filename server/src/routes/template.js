import express from "express";
import TemplateService from "../models/template.js";
import { responseClient } from "../utils";

const router = express.Router();

/**
 * 列表
 * id: category 中的 分类id
 * 没有id: 返回全部数据
 */
router.get("/list", (req, res) => {
  let { id } = req.query;
  if (+id) {
    TemplateService.find(id, (err, data) => {
      if (err) {
        responseClient(res, 500, -10000, "服务端异常", null);
        return;
      }
      responseClient(res, 200, 0, "成功", data);
    });
  } else {
    TemplateService.all((err, data) => {
      if (err) {
        responseClient(res, 500, -10000, "服务端异常", null);
        return;
      }
      responseClient(res, 200, 0, "成功", data);
    });
  }
});

// 添加
router.post("/save", (req, res) => {
  let { name } = req.body;
  if (!name) {
    responseClient(res, 400, 2, "模板不能为空");
    return;
  }
  TemplateService.save(req.body, (err, obj) => {
    if (err) {
      responseClient(res, 500, -10000, "服务端异常", null);
      return;
    }
    responseClient(res, 200, 0, "成功", obj);
  });
});

// 批量删除
router.post("/deleteList", (req, res) => {
  const ids = req.body;
  TemplateService.deleteList(ids, (err, data) => {
    if (err) {
      responseClient(res, 500, -10000, "服务端异常", null);
      return;
    }
    if (data) {
      responseClient(res, 200, 0, "成功", data);
    } else {
      responseClient(res, 200, 1, "查无数据", data);
    }
  });
});

// 详情
// router.get("/detail/:id", (req, res) => {
//   const id = req.params.id;
//   TemplateService.detail(id, (err, data) => {
//     if (err) {
//       responseClient(res, 500, -10000, "服务端异常", null);
//       return;
//     }
//     if (data) {
//       responseClient(res, 200, 0, "成功", data);
//     } else {
//       responseClient(res, 200, 1, "查无数据", data);
//     }
//   });
// });

// 更新
router.post("/update", (req, res) => {
  let { id, name } = req.body;
  if (!id) {
    responseClient(res, 400, 2, "id不能为空");
    return;
  }
  if (!name) {
    responseClient(res, 400, 2, "模板名称不能为空");
    return;
  }
  TemplateService.update(req.body, function (err, data) {
    if (err) {
      responseClient(res, 500, -10000, "服务端异常", null);
      return;
    }
    responseClient(res, 200, 0, "成功", data);
  });
});

// 删除
router.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  TemplateService.delete(id, (err, data) => {
    if (err) {
      responseClient(res, 500, -10000, "服务端异常", null);
      return;
    }
    if (data) {
      responseClient(res, 200, 0, "成功", data);
    } else {
      responseClient(res, 200, 1, "查无数据", data);
    }
  });
});

export default router;
