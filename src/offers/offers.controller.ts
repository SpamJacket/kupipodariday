import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Offer } from './entities/offer.entity';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@Body() offer: CreateOfferDto): Promise<InsertResult> {
    return this.offersService.create(offer);
  }

  @Get()
  findAll(): Promise<Offer[]> {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') offerId: string): Promise<Offer> {
    return this.offersService.findOne(+offerId);
  }

  @Patch(':id')
  update(
    @Param('id') offerId: string,
    @Body() updatedOffer: UpdateOfferDto,
  ): Promise<UpdateResult> {
    return this.offersService.update(+offerId, updatedOffer);
  }

  @Delete(':id')
  remove(@Param('id') offerId: string): Promise<DeleteResult> {
    return this.offersService.remove(+offerId);
  }
}
