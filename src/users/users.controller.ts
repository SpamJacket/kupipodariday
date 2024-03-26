import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDto): Promise<InsertResult> {
    return this.usersService.create(user);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') userId: string): Promise<User> {
    return this.usersService.findOne(+userId);
  }

  @Patch(':id')
  update(
    @Param('id') userId: string,
    @Body() updatedUser: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersService.update(+userId, updatedUser);
  }

  @Delete(':id')
  remove(@Param('id') userId: string): Promise<DeleteResult> {
    return this.usersService.remove(+userId);
  }
}
