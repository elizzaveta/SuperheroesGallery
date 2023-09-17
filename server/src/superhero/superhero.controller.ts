import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { from, Observable } from 'rxjs';
import { SuperheroEntity } from './superhero.entity';
import { SuperheroDto } from './dto/superhero.dto';

@Controller('superheroes')
export class SuperheroController {
  constructor(private superheroService: SuperheroService) {}

  @Get()
  getAll(@Query('page') page?: number) {
    return from(this.superheroService.getAll(page));
  }

  @Get('/:id')
  getById(@Param('id') id: number): Observable<SuperheroEntity> {
    return from(this.superheroService.getById(id));
  }

  @Post()
  create(
    @Body() createSuperheroDto: SuperheroDto,
  ): Observable<SuperheroEntity> {
    return from(this.superheroService.create(createSuperheroDto));
  }

  @Delete('/:superheroId')
  deleteById(@Param('superheroId') superheroId: number) {
    return from(this.superheroService.deleteById(superheroId));
  }

  @Put('/:superheroId')
  update(
    @Param('superheroId') superheroId: number,
    @Body() superheroData: SuperheroDto,
  ): Observable<SuperheroEntity> {
    return from(this.superheroService.update(superheroId, superheroData));
  }
}
