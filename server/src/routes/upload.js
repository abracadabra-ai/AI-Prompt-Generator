import express from "express";
import formidable from "formidable";
import path from "path";
import CardService from "../models/card";
import { responseClient } from "../utils";

const router = express.Router();
// form.uploadDir = path.join(__dirname, "../../", "public", "upload");
// 添加
router.post("/save", (req, res) => {
  let form = new formidable.IncomingForm();
  // form.encoding = "utf-8"; // 编码

  form.keepExtensions = true; // 保留扩展名
  //文件存储路径 最后要注意加 '/' 否则会被存在public下
  form.uploadDir = path.join(__dirname, "../../public/upload/");
  console.log("form.uploadDir", form.uploadDir);
  // 解析 formData 数据
  form.parse(req, (err, fields, files) => {
    if (err) return next(err);
    console.log("files", files);
    let imgName = files.file.newFilename;
    let imgPath = files.file.filepath;
    imgPath = imgPath.split('abracadabra-ai-web')[1]
    imgPath = imgPath.replace(/\\/g, "/");
    console.log("imgName", imgName);
    console.log("imgPath", imgPath);   
    // 返回路径和文件名
    responseClient(res, 200, 0, "成功", { name: imgName, path: imgPath });
  });
});

export default router;
