import { PickType } from '@nestjs/swagger';
import { Wishlist } from '../entities/wishlist.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateWishlistDto extends PickType(Wishlist, [
  'name',
  'description',
  'image',
] as const) {
  @IsNotEmpty()
  itemsId: number[];
}
