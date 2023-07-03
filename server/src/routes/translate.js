import express from "express";
import Axios from "axios";
import { responseClient } from "../utils";
const router = express.Router();

// 翻译接口
router.get("/info", (req, res) => {
  const {
    from = 'ZH_CN',
    to ='EN',
    text,
  } = req.query
  const url = `http://fanyi.youdao.com/translate?&doctype=json&type=${from}2${to}&i=${text}`
  return new Promise((resolve, reject) => {
    Axios.get(url).then(data => {
      resolve(responseClient(res, 200, 0, "成功", data.data.translateResult[0]))
    }).catch(err => {
      reject(responseClient(res, 500, -10000, err, null))
    })
  })
});

export default router;
