import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Bike {
  @PrimaryGeneratedColumn()
  biid!: number;

  @Column({ default: false })
  isUsed!: boolean;
}
