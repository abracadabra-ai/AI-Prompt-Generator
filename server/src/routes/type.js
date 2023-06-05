import express from "express";
import TypeService from "../models/type";
import { responseClient } from "../utils";

const router = express.Router();

/**
 * 列表
 * id: category 中的 分类id
 * 没有id: 返回全部数据
 */
router.get("/list", (req, res) => {
  let { id } = req.query;
  if (id) {
    TypeService.find(id, (err, data) => {
      if (err) {
        responseClient(res, 500, -10000, "服务端异常", null);
        return;
      }
      responseClient(res, 200, 0, "成功", data);
    });
  } else {
    TypeService.all((err, data) => {
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
    responseClient(res, 400, 2, "分组名称不能为空");
    return;
  }
  // if (!name_en) {
  //   responseClient(res, 400, 2, "英文提示词不能为空");
  //   return;
  // }
  // if (!category_id) {
  //   responseClient(res, 400, 2, "分类id不能为空");
  //   return;
  // }
  TypeService.save(req.body, (err, obj) => {
    if (err) {
      responseClient(res, 500, -10000, "服务端异常", null);
      return;
    }
    responseClient(res, 200, 0, "成功", obj);
  });
});

// 详情
router.get("/detail/:id", (req, res) => {
  const id = req.params.id;
  TypeService.detail(id, (err, data) => {
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

// 更新
router.post("/update", (req, res) => {
  let { id, name } = req.body;
  if (!id) {
    responseClient(res, 400, 2, "分类id不能为空");
    return;
  }
  if (!name) {
    responseClient(res, 400, 2, "分类名称不能为空");
    return;
  }
  TypeService.update(req.body, function (err, data) {
    if (err) {
      responseClient(res, 500, -10000, "服务端异常", null);
      return;
    }
    responseClient(res, 200, 0, "成功", data);
  });
});

// 删除
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  TypeService.delete(id, (err, data) => {
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
