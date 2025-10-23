import { Router } from "express";

import { MailController } from "../controllers/mail-controller.js";

const mailRouter = Router();
const mailController = new MailController();

mailRouter.post("/activation", mailController.sendActivationMail);
mailRouter.post("/reset", mailController.sendResetPasswordMail);

export { mailRouter };
