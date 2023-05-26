import express from "express";
import category from "./category.js";

const router = express.Router();

router.use("/category", category);

export default router;
