import { Express } from "express";

export class Routes {
  public registerRoutes(app: Express) {
    app.get("/hello", (req, res) => {
      res.json({ hello: 'world' });
    });
  }
}
