import express from "express";
import category from "./category.js";
import card from "./card.js";
import upload from "./upload.js";

// 案例类型 - 导航
import types from "./type.js";
// 案例数据
import cases from "./case.js";

const router = express.Router();

router.use("/category", category);
router.use("/card", card);
router.use("/case", cases);
router.use("/type", types);
router.use("/upload", upload);

export default router;
