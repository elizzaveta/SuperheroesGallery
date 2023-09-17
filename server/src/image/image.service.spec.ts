import { Test, TestingModule } from '@nestjs/testing';
import { ImageService } from './image.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ImageEntity } from './image.entity';
import { SuperheroEntity } from '../superhero/superhero.entity';
import { DeleteResult, Repository } from 'typeorm';

describe('ImageService', () => {
  let imageService: ImageService;
  let imageRepository: jest.Mocked<Repository<ImageEntity>>;
  let superheroRepository: jest.Mocked<Repository<SuperheroEntity>>;

  const mockImageArray: ImageEntity[] = [
    {
      id: 1,
      superhero: new SuperheroEntity(),
      base64Image: Buffer.from('image'),
    },
    {
      id: 2,
      superhero: new SuperheroEntity(),
      base64Image: Buffer.from('image 2'),
    },
  ];

  const mockImageRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };
  const mockSuperheroRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageService,
        {
          provide: getRepositoryToken(ImageEntity),
          useValue: mockImageRepository,
        },
        {
          provide: getRepositoryToken(SuperheroEntity),
          useValue: mockSuperheroRepository,
        },
      ],
    }).compile();

    imageService = module.get<ImageService>(ImageService);
    imageRepository = module.get(getRepositoryToken(ImageEntity));
    superheroRepository = module.get(getRepositoryToken(SuperheroEntity));
  });

  it('should be defined', () => {
    expect(imageService).toBeDefined();
  });

  describe('getFirst', () => {
    it('should return one image of a superhero', async () => {
      imageRepository.findOne.mockResolvedValue(mockImageArray[0]);

      const result = await imageService.getFirst(1);

      expect(result).toEqual(mockImageArray[0]);
    });
  });

  describe('deleteById', () => {
    it('should images by id array', async () => {
      const deleteResult: DeleteResult = {
        affected: 2,
        raw: [],
      };
      imageRepository.delete.mockResolvedValue(deleteResult);

      const result = await imageService.deleteById([1, 2]);

      expect(result).toEqual(deleteResult);
    });
  });

  describe('deleteAllBySuperheroId', () => {
    it('should images by id array', async () => {
      const deleteResult: DeleteResult = {
        affected: 2,
        raw: [],
      };
      imageRepository.delete.mockResolvedValue(deleteResult);

      const result = await imageService.deleteAllBySuperheroId(1);

      expect(result).toEqual(deleteResult);
    });
  });
});
