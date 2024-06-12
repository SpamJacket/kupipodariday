import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { AuthUser } from 'src/utils/decorators/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  async getWishlists(): Promise<Wishlist[]> {
    return this.wishlistsService.findMany({
      relations: ['owner', 'items'],
    });
  }

  @Post()
  async createWishlist(
    @Body() createWishlistDto: CreateWishlistDto,
    @AuthUser() user: User,
  ): Promise<Wishlist> {
    return this.wishlistsService.create(createWishlistDto, user);
  }

  @Get(':id')
  async findWishlistById(@Param('id') id: number): Promise<Wishlist> {
    return this.wishlistsService.findOneById(id);
  }

  @Patch(':id')
  async updateWishlistById(
    @Param('id') id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @AuthUser() user: User,
  ) {
    return this.wishlistsService.update(id, updateWishlistDto, user.id);
  }

  @Delete(':id')
  async deleteWishlistById(
    @Param('id') id: number,
    @AuthUser() user: User,
  ): Promise<Wishlist> {
    return this.wishlistsService.delete(id, user.id);
  }
}
