import { Request, Response, Router } from "express";
import { asyncWrapper } from "../lib/asyncWrapper";
import { MyDataSource } from "../myDataSource";
import { Agent } from "./agent.entity";

const router = Router();

router.post(
  "/add",
  asyncWrapper(async (req: Request, res: Response) => {
    try {
      const agent = await MyDataSource.getRepository(Agent).save({});
      return res.status(200).send(agent);
    } catch (error) {
      return res.status(500).send("error add agent");
    }
  })
);

router.get(
  "/check",
  asyncWrapper(async (req: Request, res: Response) => {
    return res.status(200).send("check from agent");
  })
);

export { router };
