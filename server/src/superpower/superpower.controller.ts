import { Body, Controller, Get, Post } from '@nestjs/common';
import { SuperpowerEntity } from './superpower.entity';
import { SuperpowerService } from './superpower.service';
import { from, Observable } from 'rxjs';
import { CreateSuperpowerDto } from './dto/create-superpower.dto';

@Controller('superpowers')
export class SuperpowerController {
  constructor(private superpowerService: SuperpowerService) {}

  @Get()
  getAll(): Observable<SuperpowerEntity[]> {
    return from(this.superpowerService.getAll());
  }

  @Post()
  create(@Body() data: CreateSuperpowerDto) {
    return from(this.superpowerService.create(data.name));
  }
}
