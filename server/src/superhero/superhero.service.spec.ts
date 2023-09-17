import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroService } from './superhero.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SuperheroEntity } from './superhero.entity';
import { SuperpowerService } from '../superpower/superpower.service';
import { ImageService } from '../image/image.service';
import { DeleteResult, Repository } from 'typeorm';
import { SuperpowerEntity } from '../superpower/superpower.entity';
import { ImageEntity } from '../image/image.entity';
import { SuperheroDto } from './dto/superhero.dto';

describe('SuperheroService', () => {
  let superheroService: SuperheroService;
  let superheroRepository: jest.Mocked<Repository<SuperheroEntity>>;
  let imageService: ImageService;
  let superpowerService: SuperpowerService;

  const mockSuperheroArray: SuperheroEntity[] = [
    {
      id: 1,
      nickname: 'superhero 1',
      real_name: 'superhero',
      origin_description: 'superhero',
      catch_phrase: 'superhero',
      superpowers: [new SuperpowerEntity()],
      images: [new ImageEntity()],
    },
    {
      id: 2,
      nickname: 'superhero 2',
      real_name: 'superhero',
      origin_description: 'superhero',
      catch_phrase: 'superhero',
      superpowers: [new SuperpowerEntity()],
      images: [new ImageEntity()],
    },
    {
      id: 3,
      nickname: 'superhero 3',
      real_name: 'superhero',
      origin_description: 'superhero',
      catch_phrase: 'superhero',
      superpowers: [new SuperpowerEntity()],
      images: [new ImageEntity()],
    },
    {
      id: 4,
      nickname: 'superhero 4',
      real_name: 'superhero',
      origin_description: 'superhero',
      catch_phrase: 'superhero',
      superpowers: [new SuperpowerEntity()],
      images: [new ImageEntity()],
    },
    {
      id: 5,
      nickname: 'superhero 5',
      real_name: 'superhero',
      origin_description: 'superhero',
      catch_phrase: 'superhero',
      superpowers: [new SuperpowerEntity()],
      images: [new ImageEntity()],
    },
    {
      id: 6,
      nickname: 'superhero 6',
      real_name: 'superhero',
      origin_description: 'superhero',
      catch_phrase: 'superhero',
      superpowers: [new SuperpowerEntity()],
      images: [new ImageEntity()],
    },
  ];

  const mockSuperheroRepository = {
    findOne: jest.fn(),
    findAndCount: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };
  const mockImageService = {
    getFirst: jest.fn(),
    deleteAllBySuperheroId: jest.fn(),
  };
  const mockSuperpowerService = {
    getByIdArray: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuperheroService,
        {
          provide: getRepositoryToken(SuperheroEntity),
          useValue: mockSuperheroRepository,
        },
        { provide: SuperpowerService, useValue: mockSuperpowerService },
        { provide: ImageService, useValue: mockImageService },
      ],
    }).compile();

    superheroService = module.get<SuperheroService>(SuperheroService);
    superheroRepository = module.get(getRepositoryToken(SuperheroEntity));
    imageService = module.get<ImageService>(ImageService);
    superpowerService = module.get<SuperpowerService>(SuperpowerService);
  });

  it('should be defined', () => {
    expect(superheroService).toBeDefined();
  });

  describe('getById', () => {
    it('should return a superhero by id', async () => {
      superheroRepository.findOne.mockResolvedValue(mockSuperheroArray[0]);

      const superhero = await superheroService.getById(1);
      expect(superhero).toEqual(mockSuperheroArray[0]);
    });
  });

  describe('getAll', () => {
    it('should return 5 superheroes: id, nickname and image', async () => {
      const expectedSuperheroArray: {
        id: number;
        nickname: string;
        image: Buffer;
      }[] = mockSuperheroArray
        .map((superhero) => {
          return {
            id: superhero.id,
            nickname: superhero.nickname,
            image: new ImageEntity().base64Image,
          };
        })
        .slice(0, 4);
      superheroRepository.findAndCount.mockResolvedValue([
        mockSuperheroArray.slice(0, 4),
        6,
      ]);

      jest.spyOn(imageService, 'getFirst').mockResolvedValue(new ImageEntity());

      const superheroes = await superheroService.getAll(1);
      expect(superheroes).toEqual({
        count: 6,
        data: expectedSuperheroArray,
      });
    });
  });

  describe('create', () => {
    it('should create a superhero', async () => {
      const superheroDto: SuperheroDto = {
        nickname: 'superhero 1',
        real_name: 'superhero',
        origin_description: 'superhero',
        catch_phrase: 'superhero',
        superpowersIds: [1],
      };

      superheroRepository.save.mockResolvedValue(mockSuperheroArray[0]);
      jest
        .spyOn(superpowerService, 'getByIdArray')
        .mockResolvedValue([new SuperpowerEntity()]);

      const superheroes = await superheroService.create(superheroDto);
      expect(superheroes).toEqual(mockSuperheroArray[0]);
    });
  });

  describe('deleteById', () => {
    it('should delete a superhero', async () => {
      const mockDeleteResult: DeleteResult = {
        affected: 1,
        raw: [],
      };
      superheroRepository.delete.mockResolvedValue(mockDeleteResult);
      jest
        .spyOn(imageService, 'deleteAllBySuperheroId')
        .mockResolvedValue(mockDeleteResult);

      const superheroes = await superheroService.deleteById(1);
      expect(superheroes).toEqual(mockDeleteResult);
    });
  });

  // describe('update', () => {
  //   it('should update a superhero', async () => {
  //     const superheroDto: SuperheroDto = {
  //       nickname: 'superhero 1',
  //       real_name: 'superhero',
  //       origin_description: 'superhero',
  //       catch_phrase: 'superhero',
  //       superpowersIds: [1],
  //     };
  //     const updateResult: UpdateResult = {
  //       raw: [],
  //       affected: 2,
  //       generatedMaps: [],
  //     };
  //
  //     superheroRepository.findOne.mockResolvedValue(mockSuperheroArray[4]);
  //     superheroRepository.update.mockResolvedValue(updateResult);
  //
  //     const superheroes = await superheroService.update(5, superheroDto);
  //     expect(superheroes).toEqual(updateResult);
  //   });
  // });
});
