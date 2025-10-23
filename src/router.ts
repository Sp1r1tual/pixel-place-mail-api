import { Express, Request, Response } from "express";

import { mailRouter } from "./mail/routers/mail-router.js";

const router = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Pixel Place Mail API is running" });
  });
  app.use("/", mailRouter);
};

export { router };
