import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

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
}
