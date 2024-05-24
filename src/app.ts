import express, { Request, Response, json } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send("Checked!!");
});

export default app;
