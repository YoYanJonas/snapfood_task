import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vendor } from "../vendor/vendor.entity";
import { Item } from "../item/item.entity";
import { Customer } from "../customer/customer.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  oid!: number;

  @ManyToOne(() => Vendor, (vendor: Vendor) => vendor.orders, {
    nullable: false,
  })
  vendor!: Vendor;

  @ManyToOne(() => Customer, (customer: Customer) => customer.orders)
  customer!: Customer;

  @ManyToMany(() => Item, (item: Item) => item.orders)
  items!: Item[];

  @Column({ type: "datetime" })
  delivery_time!: Date;

  @CreateDateColumn({ type: "datetime" })
  creation_time!: number;
}
