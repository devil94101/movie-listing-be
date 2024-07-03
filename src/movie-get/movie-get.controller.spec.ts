import { Test, TestingModule } from '@nestjs/testing';
import { MovieGetController } from './movie-get.controller';

describe('MovieGetController', () => {
  let controller: MovieGetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieGetController],
    }).compile();

    controller = module.get<MovieGetController>(MovieGetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
