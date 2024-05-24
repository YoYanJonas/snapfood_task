import { DelayReport } from "./../delayReport/delayReport.entity";
import { MyDataSource } from "../myDataSource";

const findEarlierReport = async () => {
  try {
    const delayReportRepository = MyDataSource.getRepository(DelayReport);

    const earliestUnassignedDelayReport = await delayReportRepository
      .createQueryBuilder("delayReport")
      .where("delayReport.agent IS NULL")
      .orderBy("delayReport.creation_time", "ASC")
      .getOne();

    console.log(earliestUnassignedDelayReport);
    return earliestUnassignedDelayReport;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default findEarlierReport;
