import { Injectable } from '@nestjs/common';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<InsertResult> {
    return await this.userRepository.insert(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(userId: number): Promise<User> {
    return this.userRepository.findOneBy({
      id: userId,
    });
  }

  async update(
    userId: number,
    updatedUser: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userRepository.update(userId, updatedUser);
  }

  async remove(userId: number): Promise<DeleteResult> {
    return this.userRepository.delete(userId);
  }
}
