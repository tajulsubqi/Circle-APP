import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm"
import { User } from "./User"
import { Like } from "./Like"
import { Reply } from "./Reply"

@Entity()
export class Thread {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  content: string

  @Column({ nullable: true })
  image: string

  @Column({ name: "user_id", nullable: true })
  userId: number

  @OneToMany(() => Like, (like) => like.thread, { onDelete: "CASCADE" })
  likes: Like[]

  @ManyToOne(() => User, (user) => user.threads, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User

  @OneToMany(() => Reply, (reply) => reply.thread, { onDelete: "CASCADE" })
  replies: Reply[]

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date
}
