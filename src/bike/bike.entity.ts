import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Trip } from "../trip/trip.entity";

@Entity()
export class Bike {
  @PrimaryGeneratedColumn()
  biid!: number;

  @Column({ default: false })
  isUsed!: boolean;
}
