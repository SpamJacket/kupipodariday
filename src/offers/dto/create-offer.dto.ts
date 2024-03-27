import { PickType } from '@nestjs/swagger';
import { Offer } from '../entities/offer.entity';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { IsInt } from 'class-validator';

export class CreateOfferDto extends PickType(Offer, [
  'amount',
  'hidden',
] as const) {
  @IsInt()
  user: User;

  @IsInt()
  item: Wish;
}
