import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "../order/order.entity";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  uid!: number;

  @OneToMany(() => Order, (order) => order.customer)
  orders!: Order[];

  @Column({ default: "user" })
  name!: string;
}
