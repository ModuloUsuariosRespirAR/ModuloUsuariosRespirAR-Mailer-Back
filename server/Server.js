import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from "express";
import AppRouter from "./../routes/Router.js";
import cors from "cors";
import sgMail from "@sendgrid/mail";

export default class Server {
  constructor(puerto, host) {
    this.puerto = puerto;
    this.host = host;
    this.app = express();
    this.router = new AppRouter().setRoutes();
    // Configurar la clave de la API de SendGrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  serverConfig() {
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    this.app.use(cors());
    this.app.use(this.router);
  }

  initServer() {
    this.app.listen(this.puerto, this.host, () => {
      console.log(`Server listening on port ${this.puerto}`);
    });
  }
}
