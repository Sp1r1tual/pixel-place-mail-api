import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";

import { router } from "./router.js";
import { errorMiddleware } from "./shared/error-middleware.js";

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

app.use(express.json());

router(app);

app.use(errorMiddleware);

const start = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`Server started on PORT: ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

start();
