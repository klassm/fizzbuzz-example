import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import * as OpenApiValidator from 'express-openapi-validator';
import { Server } from "http";
import { Routes } from "./Routes";
import cors from "cors";

export class Application {
  private server: Server | undefined;

  constructor(private readonly routes: Routes) {
  }

  public async start() {
    const app = express();

    app.use(cors())
    app.use(bodyParser.json());
    const path = __dirname + "/api.json";
    app.use(OpenApiValidator.middleware({
      apiSpec: path,
      validateRequests: true,
      validateResponses: true,
      ignoreUndocumented: false,
    }))

    this.routes.registerRoutes(app);

    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
      console.log("an error occurred", error);
      res.status(error?.status ?? 500).json({
        message: error?.message,
        errors: error?.errors,
      });

      next(error);
    });

    this.server = app.listen(80);
    console.log("server started")
  }

  public async stop() {
    if (this.server !== undefined) {
      await new Promise((resolve, reject) => {
        this.server!.close((error) => error ? reject(error) : resolve(undefined));
      })
      console.log("server stopped");
    }
  }
}
