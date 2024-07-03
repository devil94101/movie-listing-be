import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddMovieDto, CommentDto } from './dto/movie.dto';
import { ROLES } from 'src/common/constants';
import { Roles } from 'src/roles.decorator';
import { AuthGuard } from 'src/auth.gaurd';

@Controller('movie')
@UseGuards(AuthGuard)
export class MovieController {
  constructor(private readonly movieServices: MovieService) {}

  @Post('add-movie')
  @Roles([ROLES.ADMIN])
  async AddMovie(@Body() body: AddMovieDto) {
    try {
      const response = await this.movieServices.addMovie(body);
      return response;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('upload-poster')
  @Roles([ROLES.ADMIN])
  @UseInterceptors(FileInterceptor('file'))
  async UploadPoster(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const response = await this.movieServices.uploadMoviePoster(file);
      return response;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('add-comment')
  async AddComment(@Body() body: CommentDto) {
    try {
      const response = await this.movieServices.addComment(body);
      return response;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @Get('get-comments/:id')
  // async GetComment(@Param('id') id: string) {
  //   try {
  //     const response = await this.movieServices.getComment(id);
  //     return response;
  //   } catch (err) {
  //     throw new HttpException(
  //       err.message,
  //       err.status || HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  @Delete(':id')
  @Roles([ROLES.ADMIN])
  async DeleteMovie(@Param('id') id: string) {
    try {
      const response = await this.movieServices.deleteMovie(id);
      return response;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
