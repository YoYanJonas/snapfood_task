import { Request, Response, Router } from "express";
import { asyncWrapper } from "../lib/asyncWrapper";
import { MyDataSource } from "../myDataSource";
import { Agent } from "./agent.entity";
import findEarlierReport from "../lib/findEarlierReport";
import { DelayReport } from "../delayReport/delayReport.entity";

const router = Router();

router.post(
  "/add",
  asyncWrapper(async (req: Request, res: Response) => {
    try {
      const agent = await MyDataSource.getRepository(Agent).save({});
      return res.status(200).send(agent);
    } catch (error) {
      return res.status(500).send("error add agent");
    }
  })
);

router.post(
  "/pick-report",
  asyncWrapper(async (req: Request, res: Response) => {
    const { agentId } = req.body;
    try {
      const agentRepository = MyDataSource.getRepository(Agent);
      const delayReportRepository = MyDataSource.getRepository(DelayReport);

      const agent = await agentRepository.findOne({
        where: { agid: +agentId },
      });
      if (!agent || agent.isResponsible)
        return res.status(400).send("Agent is not valid");

      const properReport = (await findEarlierReport()) as DelayReport;
      if (!properReport) return res.send(200).send("there is no delayed order");

      await agentRepository.update({ agid: +agentId }, { isResponsible: true });
      await delayReportRepository.update(
        { drid: +properReport.drid },
        { agent: +agent.agid }
      );
      return res.status(200).send({ reportId: properReport.drid });
    } catch (error) {
      console.log(error);
      return res.status(500).send("error pick agent");
    }
  })
);

router.get(
  "/check",
  asyncWrapper(async (req: Request, res: Response) => {
    return res.status(200).send("check from agent");
  })
);

export { router };
