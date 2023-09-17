import { Test, TestingModule } from '@nestjs/testing';
import { SuperpowerService } from './superpower.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SuperpowerEntity } from './superpower.entity';
import { Repository } from 'typeorm';

describe('SuperpowerService', () => {
  let superpowerService: SuperpowerService;
  let superpowerRepository: jest.Mocked<Repository<SuperpowerEntity>>;

  const mockSuperpowerArray: SuperpowerEntity[] = [
    {
      id: 1,
      name: 'superpower 1',
      superheros: [],
    },
    {
      id: 2,
      name: 'superpower 2',
      superheros: [],
    },
    {
      id: 3,
      name: 'superpower 3',
      superheros: [],
    },
    {
      id: 4,
      name: 'superpower 4',
      superheros: [],
    },
  ];

  const mockSuperpowerRepository = {
    find: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuperpowerService,
        {
          provide: getRepositoryToken(SuperpowerEntity),
          useValue: mockSuperpowerRepository,
        },
      ],
    }).compile();

    superpowerService = module.get<SuperpowerService>(SuperpowerService);
    superpowerRepository = module.get(getRepositoryToken(SuperpowerEntity));
  });

  it('should be defined', () => {
    expect(superpowerService).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all superpowers', async () => {
      superpowerRepository.find.mockResolvedValue(mockSuperpowerArray);

      const result = await superpowerService.getAll();
      expect(result).toEqual(mockSuperpowerArray);
    });
  });

  describe('getAll', () => {
    it('should return all superpowers', async () => {
      superpowerRepository.find.mockResolvedValue(mockSuperpowerArray);

      const result = await superpowerService.getAll();
      expect(result).toEqual(mockSuperpowerArray);
    });
  });

  describe('getByIdArray', () => {
    it('should return all superpowers with ids present in given array', async () => {
      const idArray = [1, 4];
      const expectedResult = mockSuperpowerArray.filter(
        (superpower) => superpower.id in idArray,
      );
      superpowerRepository.find.mockResolvedValue(expectedResult);

      const result = await superpowerService.getByIdArray(idArray);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('create', () => {
    it('should create a superpower', async () => {
      const superpowerName = 'new superpower';
      const createdSuperpower: SuperpowerEntity = {
        id: 6,
        name: superpowerName,
        superheros: [],
      };
      superpowerRepository.save.mockResolvedValue(createdSuperpower);

      const result = await superpowerService.create(superpowerName);
      expect(result).toEqual(createdSuperpower);
    });
  });
});
