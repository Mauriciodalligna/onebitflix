// src/server.ts

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { database } from "./database";
import { router } from "./routes";
import { adminJs, adminJsRouter } from "./admin.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use(express.json());

app.use(router);

app.use(adminJs.options.rootPath, adminJsRouter);

const PORT = process.env.port || 3000;

app.listen(PORT, async () => {
  await database.authenticate().then(() => {
    console.log("DB connection successfull.");
  });

  console.log(`Server started successfuly at port ${PORT}.`);
});
