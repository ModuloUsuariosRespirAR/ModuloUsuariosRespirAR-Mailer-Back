import { Router } from "express";
import { MailerController } from "../../controllers/MailerController.js";

export class MailerRoutes {
  static router = Router();

  static {
    this.router.post("/send-email", MailerController.sendEmail);
    this.router.post("/send-email/multiple", MailerController.sendMultipleEmail);
    this.router.post("/send-email/change-password", MailerController.changePassword2);
  }
}
