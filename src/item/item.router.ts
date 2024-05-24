import { Request, Response, Router } from "express";
import { asyncWrapper } from "../lib/asyncWrapper";
import { MyDataSource } from "../myDataSource";
import { Item } from "./item.entity";
import { Vendor } from "../vendor/vendor.entity";

const router = Router();

router.post(
  "/add",
  asyncWrapper(async (req: Request, res: Response) => {
    const { vid, timeToReady } = req.body;

    try {
      const vendorRepository = MyDataSource.getRepository(Vendor);
      const itemRepository = MyDataSource.getRepository(Item);

      const vendor = await vendorRepository.findOne({ where: { vid } }); // Replace 'vendorId' with the actual vendor ID to which the item belongs

      const item = new Item();
      item.timeToReady = timeToReady; // Replace 'timeToReady' with the desired value

      item.vendor = vendor as Vendor;

      await itemRepository.save(item);
      return res.status(200).send(item);
    } catch (error) {
      console.log(error);
      return res.status(500).send("error add item");
    }
  })
);

router.get(
  "/check",
  asyncWrapper(async (req: Request, res: Response) => {
    return res.status(200).send("check from item");
  })
);

export { router };
