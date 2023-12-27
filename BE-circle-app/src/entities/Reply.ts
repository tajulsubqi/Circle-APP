import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { User } from "./User"
import { Thread } from "./Thread"

@Entity({ name: "replies" })
export class Reply {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  content: string

  @ManyToOne(() => User, (user) => user.replies, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" }) // untuk membuat foreignkey
  user: User

  @ManyToOne(() => Thread, (thread) => thread.replies, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "thread_id" }) // untuk membuat foreignkey
  thread: Thread

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date
}
