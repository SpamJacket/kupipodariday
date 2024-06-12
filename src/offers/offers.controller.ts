import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { AuthUser } from 'src/utils/decorators/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  async getOffers(): Promise<Offer[]> {
    return this.offersService.findMany({
      relations: {
        item: {
          owner: true,
          offers: true,
        },
        user: {
          wishes: {
            owner: true,
            offers: true,
          },
          offers: {
            user: true,
          },
          wishlists: {
            owner: true,
            items: true,
          },
        },
      },
    });
  }

  @Post()
  async createOffer(
    @Body() createOfferDto: CreateOfferDto,
    @AuthUser() user: User,
  ) {
    this.offersService.create(createOfferDto, user);
  }

  @Get(':id')
  async findOfferById(@Param('id') id: number): Promise<Offer> {
    return this.offersService.findOneById(id);
  }
}
