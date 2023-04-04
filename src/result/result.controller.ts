import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from '../authentication/guards/jwt-authentication.guard';

@Controller(':championshipCode/result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  @UseInterceptors(FileInterceptor('resultFile'))
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.create(createResultDto);
  }

  @Get()
  findAll() {
    return this.resultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultService.remove(+id);
  }
}
