import { Request, Response, Router } from "express";
import { asyncWrapper } from "../lib/asyncWrapper";
import { MyDataSource } from "../myDataSource";
import { Bike } from "./bike.entity";

const router = Router();

router.post(
  "/add",
  asyncWrapper(async (req: Request, res: Response) => {
    try {
      const bike = await MyDataSource.getRepository(Bike).save({});
      return res.status(200).send(bike);
    } catch (error) {
      return res.status(500).send("error add bike");
    }
  })
);

router.get(
  "/check",
  asyncWrapper(async (req: Request, res: Response) => {
    return res.status(200).send("check from bike");
  })
);

export { router };
