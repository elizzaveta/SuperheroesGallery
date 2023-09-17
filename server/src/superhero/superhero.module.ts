import { Module } from '@nestjs/common';
import { SuperheroController } from './superhero.controller';
import { SuperheroService } from './superhero.service';
import { ImageService } from '../image/image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperheroEntity } from './superhero.entity';
import { SuperpowerEntity } from '../superpower/superpower.entity';
import { ImageEntity } from '../image/image.entity';
import { SuperpowerService } from '../superpower/superpower.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SuperheroEntity, SuperpowerEntity, ImageEntity]),
  ],
  controllers: [SuperheroController],
  providers: [SuperheroService, ImageService, SuperpowerService],
})
export class SuperheroModule {}
