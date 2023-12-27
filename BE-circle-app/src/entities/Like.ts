import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Thread } from "./Thread"
import { User } from "./User"

@Entity({ name: "Likes" })
export class Like {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.likes, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" }) // untuk membuat foreignkey
  user: User

  @ManyToOne(() => Thread, (thread) => thread.likes, {
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
