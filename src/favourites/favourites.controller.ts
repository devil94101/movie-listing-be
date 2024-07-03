import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { AuthGuard } from 'src/auth.gaurd';

@UseGuards(AuthGuard)
@Controller('favourites')
export class FavouritesController {
  constructor(private readonly favService: FavouritesService) {}

  @Post('add')
  async AddFav(@Req() req, @Body() body: { movieId: string }) {
    try {
      const response = await this.favService.AddFav(req.user.id, body.movieId);
      return response;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async GetFav(@Req() req) {
    try {
      const response = await this.favService.getAllFavs(req.user.id);
      return response;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('data')
  async GetAllFavData(@Req() req) {
    try {
      const response = await this.favService.getFavData(req.user.id);
      return response;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
