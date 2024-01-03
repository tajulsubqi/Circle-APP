import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm"
import { Thread } from "./Thread"
import { Like } from "./Like"
import { Reply } from "./Reply"

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

  @Column({ select: true })
  password: string

  @Column({
    default: "https://placehold.co/400",
    nullable: true,
  })
  profile_picture: string

  @Column({ default: "hai from server", nullable: true })
  profile_description: string

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date

  @OneToMany(() => Thread, (thread) => thread.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  threads: Thread[]

  @OneToMany(() => Like, (like) => like.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  likes: Like[]

  @OneToMany(() => Reply, (reply) => reply.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  replies: Reply[]

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable({
    name: "followers",
    joinColumn: {
      name: "follower_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "following_id",
      referencedColumnName: "id",
    },
  })
  followers: User[]

  @ManyToMany(() => User, (user) => user.followers)
  following: User[]
}
