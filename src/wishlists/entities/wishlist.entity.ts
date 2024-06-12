import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import {
  Length,
  MaxLength,
  IsUrl,
  IsString,
  IsOptional,
} from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    length: 250,
  })
  @IsString()
  @Length(1, 250)
  name: string;

  @Column({
    length: 1500,
    default: '',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @ManyToMany(() => Wish, (wish) => wish.wishlists)
  items: Wish[];

  @ManyToOne(() => User, (user) => user.wishlists, {
    nullable: false,
  })
  owner: User;
}
