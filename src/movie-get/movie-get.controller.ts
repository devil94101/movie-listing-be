import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { MovieGetService } from './movie-get.service';

@Controller('movie-get')
export class MovieGetController {

    constructor(private readonly movieServices: MovieGetService) {}

    @Get() 
    async GetAllMovies() {
        try {
            const response = await this.movieServices.getAllMovies();
            return response;
          } catch (err) {
            throw new HttpException(
              err.message,
              err.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
    }

    @Get(':id') 
    async GetMovieData(@Param('id') id:string) {
        try {
            const response = await this.movieServices.getMovieDataUsingId(id);
            return response;
          } catch (err) {
            throw new HttpException(
              err.message,
              err.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
    }
}
