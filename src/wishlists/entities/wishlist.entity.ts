import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Length, MaxLength, IsUrl } from 'class-validator';
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
    type: 'varchar',
    length: 250,
  })
  @Length(1, 250)
  name: string;

  @Column({
    type: 'varchar',
    length: 1500,
    default: '',
  })
  @MaxLength(1500)
  description: string;

  @Column({
    type: 'varchar',
  })
  @IsUrl()
  image: string;

  @OneToMany(() => Wish, (wish) => wish.id)
  items: Wish[];

  @ManyToOne(() => User, (user) => user.id)
  owner: User;
}
