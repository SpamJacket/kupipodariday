import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { IsString, Length, IsUrl, IsEmail, IsOptional } from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { Transform } from 'class-transformer';

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
  @IsString()
  @Length(2, 30)
  username: string;

  @Column({
    type: 'varchar',
    length: 200,
    default: 'Пока ничего не рассказал о себе',
  })
  @IsOptional()
  @IsString()
  @Length(2, 200)
  about: string;

  @Column({
    type: 'varchar',
    default: 'https://i.pravatar.cc/300',
  })
  @IsOptional()
  @IsUrl()
  avatar: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  @IsEmail()
  @Transform((param) => param.value.toLowerCase())
  email: string;

  @Column({
    type: 'varchar',
  })
  @IsString()
  @Length(8, 64)
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner, {
    onDelete: 'CASCADE',
  })
  whishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user, {
    onDelete: 'CASCADE',
  })
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner, {
    onDelete: 'CASCADE',
  })
  wishlists: Wishlist[];
}
