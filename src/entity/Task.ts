import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { User } from ".";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title!: string;

  @Column({
    default: false
  })
  done!: boolean;

  @Column()
  userId: number;
  @ManyToOne(() => User, (user: User) => user.tasks)
  @JoinColumn()
  user: User;
}
