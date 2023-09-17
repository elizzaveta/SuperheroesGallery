import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuperheroEntity } from './superhero.entity';
import { DeleteResult, Repository } from 'typeorm';
import { superheroPerPageLimit } from '../../consts/pagination';
import { SuperheroDto } from './dto/superhero.dto';
import { SuperpowerService } from '../superpower/superpower.service';
import { ImageService } from '../image/image.service';
import { ImageEntity } from '../image/image.entity';

@Injectable()
export class SuperheroService {
  constructor(
    @InjectRepository(SuperheroEntity)
    private superheroRepository: Repository<SuperheroEntity>,
    private superpowerService: SuperpowerService,
    private imageService: ImageService,
  ) {}

  async getAll(page?: number) {
    if (!page) page = 1;

    const targetSuperheroes = await this.superheroRepository.findAndCount({
      skip: (page - 1) * superheroPerPageLimit,
      take: superheroPerPageLimit,
    });

    const returnObjects = targetSuperheroes[0].map(async (superhero) => {
      const image: ImageEntity = await this.imageService.getFirst(superhero.id);
      return {
        id: superhero.id,
        nickname: superhero.nickname,
        image: image ? image.base64Image : null,
      };
    });

    return {
      count: targetSuperheroes[1],
      data: await Promise.all(returnObjects),
    };
  }

  async getById(id: number): Promise<SuperheroEntity> {
    const targetSuperhero: SuperheroEntity =
      await this.superheroRepository.findOne({
        where: { id },
        relations: ['images', 'superpowers'],
      });

    if (!targetSuperhero)
      throw new NotFoundException(`Superhero with id:${id} not found!`);

    return targetSuperhero;
  }

  async create(createSuperheroDto: SuperheroDto): Promise<SuperheroEntity> {
    const newSuperhero: SuperheroEntity = Object.assign(
      new SuperheroEntity(),
      createSuperheroDto,
    );

    newSuperhero.superpowers = await this.superpowerService.getByIdArray(
      createSuperheroDto.superpowersIds,
    );

    return await this.superheroRepository.save(newSuperhero);
  }

  async deleteById(superheroId: number): Promise<DeleteResult> {
    const imagesDeleteResult = await this.imageService.deleteAllBySuperheroId(
      superheroId,
    );
    if (imagesDeleteResult) {
      return await this.superheroRepository.delete({
        id: superheroId,
      });
    }
  }

  async update(
    superheroId: number,
    superheroData: SuperheroDto,
  ): Promise<SuperheroEntity> {
    const targetSuperhero = await this.superheroRepository.findOne({
      where: { id: superheroId },
    });
    if (!targetSuperhero)
      throw new NotFoundException(
        `Superhero with id:${superheroId} not found.`,
      );

    targetSuperhero.superpowers = await this.superpowerService.getByIdArray(
      superheroData.superpowersIds,
    );
    delete superheroData.superpowersIds;

    Object.assign(targetSuperhero, superheroData);
    return await this.superheroRepository.save(targetSuperhero);
  }
}
