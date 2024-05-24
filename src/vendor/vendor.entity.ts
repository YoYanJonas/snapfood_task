import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Order } from "../order/order.entity";
import { Item } from "../item/item.entity";

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  vid!: number;

  @OneToMany(() => Item, (item) => item.vendor)
  items!: Item[];

  @OneToMany(() => Order, (order: Order) => order.vendor)
  orders!: Order[];
}
