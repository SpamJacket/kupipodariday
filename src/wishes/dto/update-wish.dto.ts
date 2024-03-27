import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateWishDto } from './create-wish.dto';

export class UpdateWishDto extends PartialType(
  OmitType(CreateWishDto, ['copied', 'owner', 'raised'] as const),
) {}
