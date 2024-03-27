import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateWishlistDto } from './create-wishlist.dto';

export class UpdateWishlistDto extends PartialType(
  OmitType(CreateWishlistDto, ['owner'] as const),
) {}
