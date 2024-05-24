import { Request, Response, Router } from "express";
import { asyncWrapper } from "../lib/asyncWrapper";
import { MyDataSource } from "../myDataSource";
import { Vendor } from "../vendor/vendor.entity";
import { Item } from "../item/item.entity";
import { In } from "typeorm";
import { Customer } from "../customer/customer.entity";
import maxOfTimeToReady from "../lib/maxOfTimeToReady";
import { Trip } from "./trip.entity";
import { Order } from "../order/order.entity";
import { Bike } from "../bike/bike.entity";

const router = Router();

router.post(
  "/add",
  asyncWrapper(async (req: Request, res: Response) => {
    const { orderId, bikeId } = req.body;
    try {
      const orderRepository = MyDataSource.getRepository(Order);
      const bikeRepository = MyDataSource.getRepository(Bike);
      const tripRepository = MyDataSource.getRepository(Trip);

      const order = await orderRepository.findOne({ where: { oid: +orderId } });
      if (!order || order.tripped)
        return res.status(400).send("order is not valid");

      const bike = await bikeRepository.findOne({ where: { biid: +bikeId } });
      if (!bike || bike.isUsed)
        return res.status(400).send("bike is not valid");

      const trip = new Trip();
      trip.bike = bike.biid;
      trip.order = order.oid;
      trip.delivery_time = order.delivery_time;

      await orderRepository.update({ oid: +orderId }, { tripped: true });
      await tripRepository.save(trip);

      return res.status(200).send(trip);
    } catch (error) {
      console.log(error);
      return res.status(500).send("error add trip");
    }
  })
);

router.get(
  "/check",
  asyncWrapper(async (req: Request, res: Response) => {
    return res.status(200).send("check from trip");
  })
);

export { router };
