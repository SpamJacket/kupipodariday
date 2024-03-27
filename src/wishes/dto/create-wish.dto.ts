import { PickType } from '@nestjs/swagger';
import { Wish } from '../entities/wish.entity';
import { User } from '../../users/entities/user.entity';
import { IsInt } from 'class-validator';

export class CreateWishDto extends PickType(Wish, [
  'name',
  'link',
  'image',
  'price',
  'raised',
  'description',
  'copied',
] as const) {
  @IsInt()
  owner: User;
}
