import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  create(@Body() wishlist: CreateWishlistDto): Promise<InsertResult> {
    return this.wishlistsService.create(wishlist);
  }

  @Get()
  findAll(): Promise<Wishlist[]> {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') wishlistId: string): Promise<Wishlist> {
    return this.wishlistsService.findOne(+wishlistId);
  }

  @Patch(':id')
  update(
    @Param('id') wishlistId: string,
    @Body() updatedWishlist: UpdateWishlistDto,
  ): Promise<UpdateResult> {
    return this.wishlistsService.update(+wishlistId, updatedWishlist);
  }

  @Delete(':id')
  remove(@Param('id') wishlistId: string): Promise<DeleteResult> {
    return this.wishlistsService.remove(+wishlistId);
  }
}
