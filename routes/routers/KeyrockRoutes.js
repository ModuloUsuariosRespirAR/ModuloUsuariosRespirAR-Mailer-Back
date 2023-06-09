import { Router } from "express";
import { KeyrockController } from "../../controllers/KeyrockController.js";

export class KeyrockRoutes {
  static router = Router();

  static {
    this.router.post("/create", KeyrockController.create);
    // this.router.get("/list", KeyrockController.list);
    // this.router.post("/update/:rolId", KeyrockController.update);
    // this.router.delete("/delete/:rolId", KeyrockController.delete);
    // this.router.post("/assign", KeyrockController.assignRole);
  }
}