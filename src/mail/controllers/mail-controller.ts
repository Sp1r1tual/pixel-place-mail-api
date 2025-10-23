import { Request, Response, NextFunction } from "express";

import mailService from "../services/mail-service.js";

import { ApiError } from "../../shared/exceptions/api-error.js";

class MailController {
  sendActivationMail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, link } = req.body;
      if (!email || !link) {
        throw ApiError.BadRequest("Email and link are required");
      }

      await mailService.sendActivationMail(email, link);
      res.status(200).json({ message: "Activation email sent" });
    } catch (error) {
      if (!(error instanceof ApiError)) {
        next(ApiError.BadRequest("Failed to send activation email"));
      } else {
        next(error);
      }
    }
  };

  sendResetPasswordMail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, link } = req.body;
      if (!email || !link) {
        throw ApiError.BadRequest("Email and reset link are required");
      }

      await mailService.sendPasswordResetMail(email, link);
      res.status(200).json({ message: "Reset password email sent" });
    } catch (error) {
      if (!(error instanceof ApiError)) {
        next(ApiError.BadRequest("Failed to send password reset email"));
      } else {
        next(error);
      }
    }
  };
}

export { MailController };
