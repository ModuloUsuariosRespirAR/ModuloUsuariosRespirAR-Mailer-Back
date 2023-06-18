import { Router } from "express";
import { KeyrockController } from "../../controllers/KeyrockController.js";

export class KeyrockRoutes {
  static router = Router();

  static initialize() {
    this.router.put("/change-password", KeyrockController.changePassword);
    this.router.post("/activate-user", KeyrockController.activateUser);
  }
}

KeyrockRoutes.initialize();
