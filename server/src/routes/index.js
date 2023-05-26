import express from "express";
import category from "./category.js";
import card from "./card.js";
import upload from "./upload.js";

const router = express.Router();

router.use("/category", category);
router.use("/card", card);
router.use("/upload", upload);

export default router;
