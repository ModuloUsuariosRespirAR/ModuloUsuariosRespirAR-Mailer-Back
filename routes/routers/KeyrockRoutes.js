import { Router } from "express";
import { KeyrockController } from "../../controllers/KeyrockController.js";

export class KeyrockRoutes {
  static router = Router();

  static {
    this.router.put("/change-password", KeyrockController.changePassword);
    this.router.post("/activate-user", KeyrockController.activateUser);
  }
}