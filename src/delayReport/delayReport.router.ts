import { Request, Response, Router, query } from "express";
import { asyncWrapper } from "../lib/asyncWrapper";
import { MyDataSource } from "../myDataSource";
import { Trip, tripStatusOptions } from "../trip/trip.entity";
import { DelayReport } from "./delayReport.entity";
import { Order } from "../order/order.entity";
import { Vendor } from "../vendor/vendor.entity";
import { Between } from "typeorm";

const router = Router();

router.post(
  "/add",
  asyncWrapper(async (req: Request, res: Response) => {
    const { orderId } = req.body;

    const nowTime = new Date();
    try {
      const tripRepository = MyDataSource.getRepository(Trip);
      const delayReportRepository = MyDataSource.getRepository(DelayReport);
      const orderRepository = MyDataSource.getRepository(Order);
      const vendorRepository = MyDataSource.getRepository(Vendor);

      const order = await orderRepository.findOne({
        where: { oid: orderId },
        relations: { vendor: true },
      });

      if (!order) return res.status(400).send("order is not valid");

      const order_delivery_time = new Date(order.delivery_time);

      if (nowTime > order_delivery_time)
        return res.send(400).send("order is on prep.");

      const vendorId = order?.vendor.vid;
      console.log(vendorId);

      const vendor = await vendorRepository.findOne({
        where: { vid: +vendorId },
      });
      if (!vendor) return res.status(400).send("vendor not found");
      if (order.tripped) {
        const trip = await tripRepository.findOne({
          where: { order: orderId },
        });
        if (!trip)
          return res.status(400).send("order for trip conditions is not valid");

        if (trip.status === tripStatusOptions.DELIVERED)
          return res.status(400).send("order is delivered");

        // here suppose we use axios to get a new time for delivery_time in trip row, I add 30 minutes
        const delayTimeInMinutes = 30;
        const delivery_time = new Date(
          new Date(trip.delivery_time).getTime() + delayTimeInMinutes * 60000
        );
        await tripRepository.update(
          { tripId: +trip.tripId },
          { delivery_time: delivery_time as Date }
        );
        const delayReport = new DelayReport();
        delayReport.trip = trip as Trip;
        delayReport.vendor = +vendor.vid;
        await delayReportRepository.save(delayReport);

        return res.status(200).send({ delayReport, newTime: delivery_time });
      }
      const delayReport = new DelayReport();
      delayReport.vendor = +vendor.vid;

      await delayReportRepository.save(delayReport);

      return res.status(200).send(delayReport);
    } catch (error) {
      console.log(error);
      return res.status(500).send("error add delayReport");
    }
  })
);

router.post(
  "/delay-list",
  asyncWrapper(async (req: Request, res: Response) => {
    const { vendorId } = req.body;
    try {
      const delayReportRepository = MyDataSource.getRepository(DelayReport);

      const today = new Date();
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      const delayReports = await delayReportRepository.find({
        where: {
          creation_time: Between(weekAgo as Date, today as Date),
        },
        order: {
          creation_time: "DESC",
        },
      });

      return res.status(200).send(delayReports);
    } catch (error) {
      console.error(error);
      return res.status(500).send("fetch list of reports failed");
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
