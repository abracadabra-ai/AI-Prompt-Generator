import express from "express";
import formidable from "formidable";
import path from "path";
// import CardService from "../models/card";
import { responseClient } from "../utils";
import fs from 'fs'

const router = express.Router();
// form.uploadDir = path.join(__dirname, "../../", "public", "upload");


// 添加
router.post("/save/tag", (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true; // 保留扩展名

  //文件存储路径 最后要注意加 '/' 否则会被存在public下
  form.uploadDir = path.join(__dirname, "../../public/upload/tag/");

  // 没有对应命令 则创建目录
  if (!fs.existsSync(form.uploadDir)) {
    fs.mkdirSync(form.uploadDir)
  }

  // 解析 formData 数据
  form.parse(req, (err, fields, files) => {
    if (err) return next(err);

    const newFilename = files.file.originalFilename
    fs.rename(files.file.filepath, path.join(form.uploadDir, newFilename), (err) => {
      if (err) {
        return next(err);
      } else {
        // 重命名成功

        let imgName = newFilename;
        let imgPath = '/upload/tag/' + newFilename;

        // 返回路径和文件名
        responseClient(res, 200, 0, "成功", { name: imgName, path: imgPath });
      }
    })
  });
});


export default router;
