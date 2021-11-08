import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Task } from "./";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username!: string;

  @Column({ select: false })
  password!: string;

  @OneToMany(() => Task, (task: Task) => task.user)
  tasks: Task[];
}
