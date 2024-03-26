import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  async create(offer: CreateOfferDto): Promise<InsertResult> {
    return this.offerRepository.insert(offer);
  }

  async findAll(): Promise<Offer[]> {
    return this.offerRepository.find();
  }

  async findOne(offerId: number): Promise<Offer> {
    return this.offerRepository.findOneBy({
      id: offerId,
    });
  }

  async update(
    offerId: number,
    updatedOffer: UpdateOfferDto,
  ): Promise<UpdateResult> {
    return this.offerRepository.update(offerId, updatedOffer);
  }

  async remove(offerId: number): Promise<DeleteResult> {
    return this.offerRepository.delete(offerId);
  }
}
