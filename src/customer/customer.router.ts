import { Request, Response, Router } from "express";
import { asyncWrapper } from "../lib/asyncWrapper";
import { Customer } from "./customer.entity";
import { MyDataSource } from "../myDataSource";

const router = Router();

router.post(
  "/add",
  asyncWrapper(async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
      if (name) {
        const user = await MyDataSource.getRepository(Customer).save({
          name,
        });

        return res.status(200).send(user);
      }
      return res.status(400).send("name not provided");
    } catch (error) {
      return res.status(500).send("error add customer");
    }
  })
);

router.get(
  "/check",
  asyncWrapper(async (req: Request, res: Response) => {
    return res.status(200).send("check from customer");
  })
);

export { router };
