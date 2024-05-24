// import { Request, Response, Router, query } from "express";
// import { asyncWrapper } from "../lib/asyncWrapper";
// import { MyDataSource } from "../myDataSource";
// // import { Trip } from "../trip/trip.entity";

// const router = Router();

// router.post(
//   "/add",
//   asyncWrapper(async (req: Request, res: Response) => {
//     const { tripId } = req.body;

//     try {
//       const tripRepository = MyDataSource.getRepository(Trip);

//       const trip = await tripRepository.findOne({ where: { trid: tripId } });
//       if (!trip) return res.status(400).send("trip is not valid");

//       return res.status(200).send("hah");
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send("error add delayReport");
//     }
//   })
// );

// router.get(
//   "/check",
//   asyncWrapper(async (req: Request, res: Response) => {
//     return res.status(200).send("check from delayReport");
//   })
// );

// export { router };
