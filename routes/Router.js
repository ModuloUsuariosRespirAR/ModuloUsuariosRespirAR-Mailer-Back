import { Router } from "express";
import { MailerRoutes } from "./routers/MailerRoutes.js";
import { KeyrockRoutes } from "./routers/KeyrockRoutes.js";

export default class AppRouter {
  constructor() {
    this.router = Router();
  }

  setRoutes() {
    this.router.use("/mailer", MailerRoutes.router);
    this.router.use("/keyrock", KeyrockRoutes.router);
    return this.router;
  }
}
