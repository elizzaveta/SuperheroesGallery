import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperheroEntity } from '../superhero/superhero.entity';
import { ImageEntity } from './image.entity';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity, SuperheroEntity])],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
