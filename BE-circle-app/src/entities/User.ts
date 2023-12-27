import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm"
import { Thread } from "./Thread"
import { Like } from "./Like"
import { Reply } from "./Reply"
import { Follows } from "./Follows"

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column()
  fullname: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  profile_picture: string

  @Column({ nullable: true })
  profile_description: string

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date

  @OneToMany(() => Thread, (thread) => thread.user, { onDelete: "CASCADE" })
  threads: Thread[]

  @OneToMany(() => Like, (like) => like.user, { onDelete: "CASCADE" })
  likes: Like[]

  @OneToMany(() => Reply, (reply) => reply.user, { onDelete: "CASCADE" })
  replies: Reply[]

  @OneToMany(() => Follows, (follows) => follows.followed, { onDelete: "CASCADE" })
  followers: Follows[]

  @OneToMany(() => Follows, (follows) => follows.followers, { onDelete: "CASCADE" })
  followed: Follows[]
}
