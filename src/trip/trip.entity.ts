import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DelayReport } from "../delayReport/delayReport.entity";

export const tripStatusOptions = Object.freeze({
  ASSIGNED: "ASSIGNED",
  AT_VENDOR: "AT_VENDOR",
  PICKED: "PICKED",
  DELIVERED: "DELIVERED",
});

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  tripId!: number;

  @Column({
    nullable: false,
  })
  order!: number;

  @Column({
    nullable: false,
  })
  bike!: number;

  @OneToMany(
    () => DelayReport,
    (delayReport: DelayReport) => delayReport.trip,
    { nullable: true }
  )
  delayReports!: DelayReport[];

  @Column({ type: "datetime" })
  delivery_time!: Date;

  @Column({
    type: "enum",
    default: tripStatusOptions.AT_VENDOR,
    enum: tripStatusOptions,
  })
  status!: string;

  @CreateDateColumn({ type: "datetime" })
  creation_time!: number;
}
