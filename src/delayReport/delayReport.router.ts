import { Request, Response, Router, query } from "express";
import { asyncWrapper } from "../lib/asyncWrapper";
import { MyDataSource } from "../myDataSource";
import { Trip, tripStatusOptions } from "../trip/trip.entity";
import { DelayReport } from "./delayReport.entity";
import { Order } from "../order/order.entity";

const router = Router();

router.post(
  "/add",
  asyncWrapper(async (req: Request, res: Response) => {
    const { orderId } = req.body;

    try {
      const tripRepository = MyDataSource.getRepository(Trip);
      const delayReportRepository = MyDataSource.getRepository(DelayReport);
      const orderRepository = MyDataSource.getRepository(Order);

      const order = await orderRepository.findOne({ where: { oid: orderId } });
      if (!order) return res.status(400).send("order is not valid");
      if (order.tripped) {
        const trip = await tripRepository.findOne({
          where: { order: orderId },
        });
        if (!trip)
          return res.status(400).send("order for trip conditions is not valid");

        if (trip.status === tripStatusOptions.DELIVERED)
          return res.status(400).send("order is delivered");

        // here suppose we use axios to get a new time for delivery_time in trip row

        const delayReport = new DelayReport();
        delayReport.trip = trip as Trip;

        await delayReportRepository.save(delayReport);

        return res.status(200).send(delayReport);
      }
      const delayReport = new DelayReport();

      await delayReportRepository.save(delayReport);

      return res.status(200).send(delayReport);
    } catch (error) {
      console.log(error);
      return res.status(500).send("error add delayReport");
    }
  })
);

router.get(
  "/check",
  asyncWrapper(async (req: Request, res: Response) => {
    return res.status(200).send("check from delayReport");
  })
);

export { router };
