import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async create(wish: CreateWishDto): Promise<InsertResult> {
    return this.wishRepository.insert(wish);
  }

  async findAll(): Promise<Wish[]> {
    return this.wishRepository.find();
  }

  async findOne(wishId: number): Promise<Wish> {
    return this.wishRepository.findOneBy({
      id: wishId,
    });
  }

  async update(
    wishId: number,
    updatedWish: UpdateWishDto,
  ): Promise<UpdateResult> {
    return this.wishRepository.update(wishId, updatedWish);
  }

  async remove(wishId: number): Promise<DeleteResult> {
    return this.wishRepository.delete(wishId);
  }
}
