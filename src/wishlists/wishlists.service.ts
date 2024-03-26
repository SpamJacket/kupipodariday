import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
  ) {}

  async create(wishlist: CreateWishlistDto): Promise<InsertResult> {
    return this.wishlistRepository.insert(wishlist);
  }

  async findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find();
  }

  async findOne(wishlistId: number): Promise<Wishlist> {
    return this.wishlistRepository.findOneBy({
      id: wishlistId,
    });
  }

  async update(
    wishlistId: number,
    updatedWishlist: UpdateWishlistDto,
  ): Promise<UpdateResult> {
    return this.wishlistRepository.update(wishlistId, updatedWishlist);
  }

  async remove(wishlistId: number): Promise<DeleteResult> {
    return this.wishlistRepository.delete(wishlistId);
  }
}
