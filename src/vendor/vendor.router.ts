import { Request, Response, Router } from "express";
import { asyncWrapper } from "../lib/asyncWrapper";
import { MyDataSource } from "../myDataSource";
import { Vendor } from "./vendor.entity";

const router = Router();

router.post(
  "/add",
  asyncWrapper(async (req: Request, res: Response) => {
    try {
      const vendor = await MyDataSource.getRepository(Vendor).save({});
      return res.status(200).send(vendor);
    } catch (error) {
      return res.status(500).send("error add vendor");
    }
  })
);

router.get(
  "/check",
  asyncWrapper(async (req: Request, res: Response) => {
    return res.status(200).send("check from vendor");
  })
);

export { router };
