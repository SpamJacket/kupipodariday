import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createHash } from 'src/utils/hash';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(query: FindOneOptions<User>): Promise<User> {
    return this.usersRepository.findOne(query);
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async findMany(query: FindManyOptions<User>): Promise<User[]> {
    return this.usersRepository.find(query);
  }

  async findUserByUsername(username: string): Promise<User> {
    const user = await this.findOne({
      where: {
        username: username,
      },
    });

    if (!user) throw new NotFoundException('Таких тут нет');

    return user;
  }

  async getUserWishes(
    username: string,
    isCurrentUser: boolean,
  ): Promise<Wish[]> {
    const user = await this.findOne({
      where: { username },
      relations: isCurrentUser
        ? {
            wishes: {
              owner: true,
              offers: true,
            },
          }
        : {
            wishes: {
              owner: true,
              offers: {
                item: {
                  owner: true,
                  offers: {
                    item: {
                      owner: true,
                      offers: true,
                    },
                  },
                },
              },
            },
          },
    });

    if (!user) throw new NotFoundException('Таких тут нет');

    return user.wishes;
  }

  async update(user: User, updateUserDto: UpdateUserDto) {
    const isSameEmail = user.email === updateUserDto.email;
    const isSameUsername = user.username === updateUserDto.username;

    if (
      updateUserDto.email &&
      !isSameEmail &&
      (await this.findOne({ where: { email: updateUserDto.email } }))
    )
      throw new ConflictException('Пользователь с таким email уже существует');

    if (
      updateUserDto.username &&
      !isSameUsername &&
      (await this.findOne({ where: { username: updateUserDto.username } }))
    )
      throw new ConflictException('Пользователь с таким именем уже существует');

    const { password } = updateUserDto;

    if (password) updateUserDto.password = await createHash(password);

    return this.usersRepository
      .save({ ...user, ...updateUserDto })
      .then((updatedUser) =>
        this.findOne({
          where: { id: updatedUser.id },
          select: {
            email: true,
            username: true,
            id: true,
            avatar: true,
            about: true,
            createdAt: true,
            updatedAt: true,
          },
        }),
      );
  }

  async signup(createUserDto: CreateUserDto): Promise<User> {
    if (
      (await this.findOne({ where: { email: createUserDto.email } })) ||
      (await this.findOne({ where: { username: createUserDto.username } }))
    )
      throw new ConflictException(
        'Пользователь с таким email или username уже зарегистрирован',
      );

    const { password } = createUserDto;
    const user = this.usersRepository.create({
      ...createUserDto,
      password: await createHash(password),
    });

    return this.usersRepository.save(user).then((newUser) =>
      this.findOne({
        where: { id: newUser.id },
        select: {
          email: true,
          username: true,
          id: true,
          avatar: true,
          about: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    );
  }
}
