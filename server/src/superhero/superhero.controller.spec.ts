import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroController } from './superhero.controller';
import { SuperheroService } from './superhero.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SuperheroEntity } from './superhero.entity';
import { ImageService } from '../image/image.service';
import { SuperpowerService } from '../superpower/superpower.service';
import { Observable, tap } from 'rxjs';
import { SuperpowerEntity } from '../superpower/superpower.entity';
import { ImageEntity } from '../image/image.entity';
import { DeleteResult } from 'typeorm';
import { SuperheroDto } from './dto/superhero.dto';

describe('SuperheroController', () => {
  let superheroController: SuperheroController;
  let superheroService: SuperheroService;

  const mockSuperheroGetAllArray = [
    {
      id: 1,
      nickname: 'superhero 1',
      image: Buffer.from('image'),
    },
    {
      id: 2,
      nickname: 'superhero 2',
      image: Buffer.from('image'),
    },
    {
      id: 3,
      nickname: 'superhero 3',
      image: Buffer.from('image'),
    },
    {
      id: 4,
      nickname: 'superhero 4',
      image: Buffer.from('image'),
    },
    {
      id: 5,
      nickname: 'superhero 5',
      image: Buffer.from('image'),
    },
  ];
  const mockSuperhero: SuperheroEntity = {
    id: 5,
    nickname: 'superhero',
    real_name: 'superhero',
    origin_description: 'superhero',
    catch_phrase: 'superhero',
    superpowers: [new SuperpowerEntity()],
    images: [new ImageEntity()],
  };

  const mockSuperheroService = {
    getAll: jest.fn(),
    getById: jest.fn(),
    deleteById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroController],
      providers: [
        { provide: SuperheroService, useValue: mockSuperheroService },
        { provide: getRepositoryToken(SuperheroEntity), useValue: {} },
        { provide: SuperpowerService, useValue: {} },
        { provide: ImageService, useValue: {} },
      ],
    }).compile();

    superheroController = module.get<SuperheroController>(SuperheroController);
    superheroService = module.get<SuperheroService>(SuperheroService);
  });

  it('should be defined', () => {
    expect(superheroController).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of 5 first superheroes', async () => {
      const expectedResult = {
        count: mockSuperheroGetAllArray.length,
        data: mockSuperheroGetAllArray.slice(0, 4),
      };

      jest.spyOn(superheroService, 'getAll').mockResolvedValue(expectedResult);
      const result = await superheroController.getAll(1);

      result.pipe(tap((result) => expect(result).toEqual(expectedResult)));
    });
  });

  describe('getById', () => {
    it('should return superhero by id', async () => {
      const expectedResult = mockSuperhero;

      jest.spyOn(superheroService, 'getById').mockResolvedValue(mockSuperhero);
      const result: Observable<SuperheroEntity> =
        await superheroController.getById(5);

      result.pipe(tap((result) => expect(result).toEqual(expectedResult)));
    });
  });

  describe('create', () => {
    it('should create a superhero', async () => {
      const superheroDto: SuperheroDto = {
        nickname: 'superhero',
        real_name: 'superhero',
        origin_description: 'superhero',
        catch_phrase: 'superhero',
        superpowersIds: [1],
      };
      const createdSuperhero: SuperheroEntity = mockSuperhero;

      jest.spyOn(superheroService, 'create').mockResolvedValue(mockSuperhero);
      const result = await superheroController.create(superheroDto);

      result.pipe(tap((result) => expect(result).toEqual(createdSuperhero)));
    });
  });

  describe('delete', () => {
    it('should delete a superhero', async () => {
      const mockDeleteResult: DeleteResult = {
        affected: 1,
        raw: [],
      };

      jest
        .spyOn(superheroService, 'deleteById')
        .mockResolvedValue(mockDeleteResult);
      const result: Observable<DeleteResult> =
        await superheroController.deleteById(1);

      result.pipe(tap((result) => expect(result).toEqual(mockDeleteResult)));
    });
  });

  // describe('update', () => {
  //   it('should update a superhero', async () => {
  //     const superheroDto: SuperheroDto = {
  //       nickname: 'superhero updated',
  //       real_name: 'superhero',
  //       origin_description: 'superhero',
  //       catch_phrase: 'superhero',
  //       superpowersIds: [1],
  //     };
  //     const updateResult: UpdateResult = {
  //       raw: [],
  //       affected: 1,
  //       generatedMaps: [],
  //     };
  //
  //     jest.spyOn(superheroService, 'update').mockResolvedValue(updateResult);
  //     const result: Observable<UpdateResult> = await superheroController.update(
  //       mockSuperhero.id,
  //       superheroDto,
  //     );
  //
  //     result.pipe(tap((result) => expect(result).toEqual(updateResult)));
  //   });
  // });
});
