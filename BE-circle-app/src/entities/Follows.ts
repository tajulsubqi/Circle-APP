import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { User } from "./User"

@Entity({ name: "follows" })
export class Follows {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.followers, { onDelete: "CASCADE" })
  followers: User[]

  @ManyToOne(() => User, (user) => user.followers, { onDelete: "CASCADE" })
  followed: User

  @CreateDateColumn({ type: "timestamp with time zone" })
  creadet_at: Date

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date
}
