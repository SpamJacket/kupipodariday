import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
  ) {}

  async findOne(query: FindOneOptions<Wish>): Promise<Wish> {
    return this.wishesRepository.findOne(query);
  }

  async findOneById(id: number): Promise<Wish> {
    return this.findOne({ where: { id }, relations: ['owner', 'offers'] });
  }

  async findMany(query: FindManyOptions<Wish>): Promise<Wish[]> {
    return this.wishesRepository.find(query);
  }

  async create(owner: User, createWishDto: CreateWishDto): Promise<Wish> {
    const wish = this.wishesRepository.create({
      ...createWishDto,
      owner,
    });

    return this.wishesRepository.save(wish);
  }

  async update(
    wishId: number,
    updateWishDto: UpdateWishDto,
    userId: number,
  ): Promise<Wish> {
    const wish = await this.findOneById(wishId);

    if (!wish)
      throw new NotFoundException(
        'Может вы хотели обновить что-то другое? Этого нет',
      );

    if (wish.owner.id !== userId)
      throw new ForbiddenException('Нельзя обновлять чужие подарки!');

    if (updateWishDto.price && wish.offers.length > 0) {
      throw new ForbiddenException(
        'Этот подарок уже поддержали, не стоит его обновлять',
      );
    }

    return this.wishesRepository.save({ ...wish, ...updateWishDto });
  }

  async updateWishRaise(id: number, amount: number): Promise<UpdateResult> {
    return this.wishesRepository.update({ id }, { raised: amount });
  }

  async delete(wishId: number, userId: number): Promise<Wish> {
    const wish = await this.findOneById(wishId);

    if (!wish) {
      throw new NotFoundException('Этого подарка уже нет');
    }
    if (wish.owner.id != userId) {
      throw new ForbiddenException('Нельзя удалять чужие подарки!');
    }

    await this.wishesRepository.delete(wishId);

    return wish;
  }

  async copy(wishId: number, user: User) {
    const wish = await this.findOneById(wishId);

    if (!wish) {
      throw new NotFoundException('Нельзя скопировать то, чего нет');
    }

    const copiedWish = await this.findOne({
      where: {
        owner: { id: user.id },
        name: wish.name,
      },
    });

    if (copiedWish) {
      throw new ConflictException('Вы уже скопировали этот подарок');
    }

    const wishCopy: CreateWishDto = {
      name: wish.name,
      link: wish.link,
      image: wish.image,
      price: wish.price,
      description: wish.description,
    };

    return this.create(user, wishCopy).then(() => {
      return this.wishesRepository.save({ ...wish, copied: wish.copied + 1 });
    });
  }
}
