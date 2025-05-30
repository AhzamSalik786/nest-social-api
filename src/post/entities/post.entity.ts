import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

export enum Platform {
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  INSTAGRAM = 'instagram',
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  content: string;

  @Column({ type: 'enum', enum: Platform })
  platform: Platform;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  posted_at: Date;
}
