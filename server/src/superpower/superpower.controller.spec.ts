import { Test, TestingModule } from '@nestjs/testing';
import { SuperpowerController } from './superpower.controller';
import { SuperpowerService } from './superpower.service';
import { SuperpowerEntity } from './superpower.entity';
import { tap } from 'rxjs';
import { CreateSuperpowerDto } from './dto/create-superpower.dto';

describe('SuperpowerController', () => {
  let superpowerController: SuperpowerController;
  let superpowerService: SuperpowerService;

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
  ];

  const mockSuperpowerService = {
    getAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperpowerController],
      providers: [
        { provide: SuperpowerService, useValue: mockSuperpowerService },
      ],
    }).compile();

    superpowerController =
      module.get<SuperpowerController>(SuperpowerController);
    superpowerService = module.get<SuperpowerService>(SuperpowerService);
  });

  it('should be defined', () => {
    expect(superpowerController).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all superpowers', async () => {
      jest
        .spyOn(superpowerService, 'getAll')
        .mockResolvedValue(mockSuperpowerArray);

      const result = await superpowerController.getAll();
      result.pipe(tap((result) => expect(result).toEqual(mockSuperpowerArray)));
    });
  });

  describe('create', () => {
    it('should create superpowers', async () => {
      const superpowerDto: CreateSuperpowerDto = {
        name: 'superpower 1',
      };

      jest
        .spyOn(superpowerService, 'create')
        .mockResolvedValue(mockSuperpowerArray[0]);

      const result = await superpowerController.create(superpowerDto);
      result.pipe(
        tap((result) => expect(result).toEqual(mockSuperpowerArray[0])),
      );
    });
  });
});
