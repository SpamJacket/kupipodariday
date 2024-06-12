import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { AuthUser } from 'src/utils/decorators/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from './entities/wish.entity';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Public } from 'src/utils/decorators/public.decorator';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  async createWish(
    @Body() createWishDto: CreateWishDto,
    @AuthUser() user: User,
  ) {
    this.wishesService.create(user, createWishDto);
  }

  @Public()
  @Get('last')
  async getLastWishes(): Promise<Wish[]> {
    return this.wishesService.findMany({
      order: { createdAt: 'DESC' },
      take: 40,
      relations: ['owner', 'offers'],
    });
  }

  @Public()
  @Get('top')
  async getTopWishes(): Promise<Wish[]> {
    return this.wishesService.findMany({
      order: { copied: 'DESC' },
      take: 20,
      relations: ['owner', 'offers'],
    });
  }

  @Get(':id')
  async findWishById(@Param('id') id: number): Promise<Wish> {
    return this.wishesService.findOneById(id);
  }

  @Patch(':id')
  async updateWishById(
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
    @AuthUser() user: User,
  ) {
    this.wishesService.update(id, updateWishDto, user.id);
  }

  @Delete(':id')
  async deleteWishById(
    @Param('id') id: number,
    @AuthUser() user: User,
  ): Promise<Wish> {
    return this.wishesService.delete(id, user.id);
  }

  @Post(':id/copy')
  async copyWishById(@Param('id') id: number, @AuthUser() user: User) {
    return this.wishesService.copy(id, user);
  }
}
