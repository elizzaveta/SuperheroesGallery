import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { from, Observable } from 'rxjs';
import { DeleteResult } from 'typeorm';
import { ImageEntity } from './image.entity';

@Controller('images')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post('/:superheroId')
  @UseInterceptors(AnyFilesInterceptor())
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('superheroId') superheroId: number,
  ): Observable<ImageEntity[]> {
    return from(this.imageService.create(files, superheroId));
  }

  @Delete()
  deleteById(@Body() imagesIds: number[]): Observable<DeleteResult> {
    return from(this.imageService.deleteById(imagesIds));
  }
}
