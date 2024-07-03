import { Module } from '@nestjs/common';
import { MovieGetController } from './movie-get.controller';
import { MovieGetService } from './movie-get.service';

@Module({
  controllers: [MovieGetController],
  providers: [MovieGetService]
})
export class MovieGetModule {}
