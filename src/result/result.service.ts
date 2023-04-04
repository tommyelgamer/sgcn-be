import { Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';

@Injectable()
export class ResultService {
  create(createResultDto: CreateResultDto) {
    return 'This action adds a new result';
  }

  findAll() {
    return `This action returns all result`;
  }

  findOne(id: number) {
    return `This action returns a #${id} result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
