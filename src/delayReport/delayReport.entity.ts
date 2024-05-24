import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Trip } from "../trip/trip.entity";

@Entity()
export class DelayReport {
  @PrimaryGeneratedColumn()
  drid!: number;

  @CreateDateColumn({ type: "datetime" })
  creation_time!: number;

  @ManyToOne(() => Trip, (trip: Trip) => trip.delayReports, { nullable: true })
  trip!: Trip;

  @Column({ nullable: false })
  vendor!: number;

  @Column({ nullable: true })
  agent!: number;
}
