import { Request, Response, Router } from "express";
import { asyncWrapper } from "../lib/asyncWrapper";
import { MyDataSource } from "../myDataSource";
import { Vendor } from "../vendor/vendor.entity";
import { Item } from "../item/item.entity";
import { In } from "typeorm";
import { Customer } from "../customer/customer.entity";
import maxOfTimeToReady from "../lib/maxOfTimeToReady";
import { Order } from "./order.entity";

const router = Router();

router.post(
  "/add",
  asyncWrapper(async (req: Request, res: Response) => {
    const { customerId, itemsId } = req.body;
    try {
      const vendorRepository = MyDataSource.getRepository(Vendor);
      const itemRepository = MyDataSource.getRepository(Item);
      const customerRepository = MyDataSource.getRepository(Customer);
      const orderRepository = MyDataSource.getRepository(Order);

      const items = await itemRepository.find({
        where: {
          mid: In(itemsId),
        },
        relations: { vendor: true },
      });

      const customer = await customerRepository.findOne({
        where: { uid: +customerId },
      });

      // need to safe route for not picking other vendor's items. but not now

      const vendor = items[0].vendor;

      const delivery_timeInMinute = maxOfTimeToReady(
        items.map((item) => item.timeToReady)
      );

      const delivery_time = new Date(
        new Date().getTime() + delivery_timeInMinute * 60000
      );

      const order = new Order();
      order.vendor = vendor as Vendor;
      order.customer = customer as Customer;
      order.delivery_time = delivery_time as Date;
      order.items = items as Item[];

      await orderRepository.save(order);
      return res.status(200).send(order);
    } catch (error) {
      console.log(error);
      return res.status(500).send("error add order");
    }
    // need to add bike pick route to add trip to order row
  })
);

router.get(
  "/check",
  asyncWrapper(async (req: Request, res: Response) => {
    return res.status(200).send("check from item");
  })
);

export { router };
