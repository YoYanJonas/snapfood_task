import express, { Request, Response, json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router as customerRouter } from "./customer/customer.router";
import { router as bikeRouter } from "./bike/bike.router";
import { router as agentRouter } from "./agent/agent.router";
import { router as vendorRouter } from "./vendor/vendor.router";
import { router as itemRouter } from "./item/item.router";
import { router as orderRouter } from "./order/order.router";
// import { router as tripRouter } from "./trip/trip.router";
// import { router as delayReportRouter } from "./delayReport/delayReport.router";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/bike", bikeRouter);
app.use("/api/v1/agent", agentRouter);
app.use("/api/v1/vendor", vendorRouter);
app.use("/api/v1/item", itemRouter);
app.use("/api/v1/order", orderRouter);
// app.use("/api/v1/trip", tripRouter);
// app.use("/api/v1/delayReport", delayReportRouter);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send("Checked!!");
});

export default app;
