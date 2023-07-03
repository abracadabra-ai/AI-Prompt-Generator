import express from "express";
import path from "path";
import cors from "cors";
import logger from "morgan";
import router from "./routes/index";

const app = express();

// 服务端相关
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", router);

// C端打包
app.use("/", express.static(path.join(__dirname, "../public/dist")));

export default app;
