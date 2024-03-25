import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Length, IsUrl, IsEmail } from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'varchar',
    length: 30,
    unique: true,
  })
  @Length(2, 30)
  username: string;

  @Column({
    type: 'varchar',
    length: 200,
    default: 'Пока ничего не рассказал о себе',
  })
  @Length(2, 200)
  about: string;

  @Column({
    type: 'varchar',
    default: 'https://i.pravatar.cc/300',
  })
  @IsUrl()
  avatar: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @OneToMany(() => Wish, (wish) => wish.id)
  whishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.id)
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.id)
  wishlists: Wishlist[];
}
