import { Order } from "../order/order.entity";
import { Vendor } from "./../vendor/vendor.entity";
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToOne,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from "typeorm";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  mid!: number;

  @ManyToOne(() => Vendor, (vendor: Vendor) => vendor.items, {
    nullable: false,
  })
  vendor!: Vendor;

  @Column({ default: 30 })
  timeToReady!: number;

  @ManyToMany(() => Order, (order: Order) => order.items)
  orders!: Order[];
}
