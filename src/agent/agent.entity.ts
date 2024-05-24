import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Agent {
  @PrimaryGeneratedColumn()
  agid!: number;

  @Column({ default: false })
  isResponsible!: boolean;
}
