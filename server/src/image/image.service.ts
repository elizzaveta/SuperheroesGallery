import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from './image.entity';
import { DeleteResult, In, Repository } from 'typeorm';
import { SuperheroEntity } from '../superhero/superhero.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private imageRepository: Repository<ImageEntity>,
    @InjectRepository(SuperheroEntity)
    private superheroRepository: Repository<SuperheroEntity>,
  ) {}

  async create(images: Array<Express.Multer.File>, superheroId: number) {
    if (!images) throw new BadRequestException('No images provided');

    const imageEntities = await Promise.all(
      images.map(async (image) => {
        const imageEntity = new ImageEntity();
        imageEntity.superhero = await this.superheroRepository.findOne({
          where: { id: superheroId },
        });
        imageEntity.base64Image = image.buffer;
        return imageEntity;
      }),
    );
    return this.imageRepository.save(imageEntities);
  }

  async getFirst(superheroId: number) {
    return await this.imageRepository.findOne({
      where: { superhero: { id: superheroId } },
    });
  }

  async deleteAllBySuperheroId(superheroId: number) {
    return await this.imageRepository.delete({
      superhero: { id: superheroId },
    });
  }

  async deleteById(imagesIds: number[]): Promise<DeleteResult> {
    return await this.imageRepository.delete({ id: In(imagesIds) });
  }
}
