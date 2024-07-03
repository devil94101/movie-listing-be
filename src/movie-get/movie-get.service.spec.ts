import { Test, TestingModule } from '@nestjs/testing';
import { MovieGetService } from './movie-get.service';

describe('MovieGetService', () => {
  let service: MovieGetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieGetService],
    }).compile();

    service = module.get<MovieGetService>(MovieGetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
