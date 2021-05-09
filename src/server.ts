import express from "express";

const app: express.Application = express();

app.get("/", (req: express.Request, res: express.Response) =>
  res.send("⚡Renteefy server online 🟢")
);

export const server = app;
