import { PickType } from '@nestjs/swagger';
import { Wishlist } from '../entities/wishlist.entity';
import { IsInt } from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class CreateWishlistDto extends PickType(Wishlist, [
  'name',
  'description',
  'image',
] as const) {
  @IsInt()
  owner: User;
}
