import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getChampionshipUsers(championshipId: number) {
    const user = await this.usersRepository.find({
      where: {
        championshipId,
      },
      select: {
        id: true,
        championshipId: true,
        username: true,
        role: true,
      },
    });

    if (user) {
      return user;
    }

    throw new NotFoundException('User not found');
  }

  async getByUsername(championshipId: number, username: string) {
    const user = await this.usersRepository.findOne({
      where: {
        championshipId,
        username,
      },
    });

    if (user) {
      return user;
    }

    throw new NotFoundException('User not found');
  }

  async createUser(championshipId: number, createUserDto: CreateUserDto) {
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);

    return this.usersRepository.save({
      championshipId: championshipId,
      username: createUserDto.username,
      password: hashedPassword,
      role: createUserDto.role,
    });
  }
}
