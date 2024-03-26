import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Wish } from './entities/wish.entity';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  create(@Body() wish: CreateWishDto): Promise<InsertResult> {
    return this.wishesService.create(wish);
  }

  @Get()
  findAll(): Promise<Wish[]> {
    return this.wishesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') wishId: string): Promise<Wish> {
    return this.wishesService.findOne(+wishId);
  }

  @Patch(':id')
  update(
    @Param('id') wishId: string,
    @Body() updatedWish: UpdateWishDto,
  ): Promise<UpdateResult> {
    return this.wishesService.update(+wishId, updatedWish);
  }

  @Delete(':id')
  remove(@Param('id') wishId: string): Promise<DeleteResult> {
    return this.wishesService.remove(+wishId);
  }
}
