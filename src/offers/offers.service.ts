import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { WishesService } from 'src/wishes/wishes.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
  ) {}

  async findOne(query: FindOneOptions<Offer>): Promise<Offer> {
    return this.offersRepository.findOne(query);
  }

  async findOneById(id: number): Promise<Offer> {
    const offer = await this.findOne({
      where: { id },
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

    if (!offer) throw new NotFoundException('Такого нет, попробуй другое');

    return offer;
  }

  async findMany(query: FindManyOptions<Offer>): Promise<Offer[]> {
    return this.offersRepository.find(query);
  }

  async create(createOfferDto: CreateOfferDto, user: User): Promise<Offer> {
    const wish = await this.wishesService.findOneById(createOfferDto.itemId);

    if (!wish)
      throw new NotFoundException(
        'Как можно поддержать ничего? Сначала определись',
      );

    if (wish.owner.id === user.id)
      throw new ForbiddenException('Это что самолайк? Не надо так');

    if (
      createOfferDto.amount > wish.price ||
      createOfferDto.amount > wish.price - wish.raised
    )
      throw new ForbiddenException('Деньги лишние что-ли? Оставь себе немного');

    if (wish.price === wish.raised)
      throw new ForbiddenException('Уже не надо, спасибо');

    await this.wishesService.updateWishRaise(
      wish.id,
      wish.raised + createOfferDto.amount,
    );

    return await this.offersRepository.save({
      ...createOfferDto,
      owner: user,
      item: wish,
    });
  }
}
