import { Test, TestingModule } from '@nestjs/testing';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { DeleteResult } from 'typeorm';
import { tap } from 'rxjs';

describe('ImageController', () => {
  let imageController: ImageController;
  let imageService: ImageService;

  const mockImageService = {
    deleteById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageController],
      providers: [{ provide: ImageService, useValue: mockImageService }],
    }).compile();

    imageController = module.get<ImageController>(ImageController);
    imageService = module.get<ImageService>(ImageService);
  });

  it('should be defined', () => {
    expect(imageController).toBeDefined();
  });

  describe('deleteById', () => {
    it('should delete images', async () => {
      const deleteResult: DeleteResult = {
        affected: 2,
        raw: [],
      };

      jest.spyOn(imageService, 'deleteById').mockResolvedValue(deleteResult);
      const result = await imageController.deleteById([1, 2]);

      result.pipe(tap((result) => expect(result).toEqual(deleteResult)));
    });
  });
});
