import nodemailer, { Transporter } from "nodemailer";

import { activationMailTemplate } from "../views/activation-mail.js";
import { resetPasswordMailTemplate } from "../views/reset-password-mail.js";

class MailService {
  private transporter: Transporter | null;
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.transporter = null;
    this.apiUrl = apiUrl;
  }

  private initializeTransporter(): void {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER as string,
          pass: process.env.SMTP_PASSWORD as string,
        },
      });
    }
  }

  public async sendActivationMail(to: string, link: string): Promise<void> {
    this.initializeTransporter();
    if (!this.transporter) throw new Error("Transporter not initialized");

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Activating an account in ${this.apiUrl}`,
      html: activationMailTemplate(link),
    });
  }

  public async sendPasswordResetMail(
    to: string,
    resetLink: string,
  ): Promise<void> {
    this.initializeTransporter();
    if (!this.transporter) throw new Error("Transporter not initialized");

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Password Reset Request - ${this.apiUrl}`,
      html: resetPasswordMailTemplate(resetLink),
    });
  }
}

export default new MailService(process.env.API_URL as string);
