import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class DelayReport {
  @PrimaryGeneratedColumn()
  drid!: number;

  @CreateDateColumn({ type: "datetime" })
  creation_time!: number;
}
