import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Length, IsUrl, Min } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';

@Entity()
export class Wish {
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
  })
  @IsUrl()
  link: string;

  @Column({
    type: 'varchar',
  })
  @IsUrl()
  image: string;

  @Column({
    type: 'numeric',
    scale: 2,
  })
  @Min(1)
  price: number;

  @Column({
    type: 'numeric',
    scale: 2,
    default: 0,
  })
  @Min(0)
  raised: number;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;

  @Column({
    type: 'varchar',
    length: 1024,
  })
  @Length(1, 2024)
  description: string;

  @OneToMany(() => Offer, (offer) => offer.id)
  offers: Offer[];

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.id)
  wishlist: Wishlist;

  @Column({
    type: 'int',
    default: 0,
  })
  @Min(0)
  copied: number;
}
