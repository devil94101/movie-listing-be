import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsString } from 'class-validator';

export class AddMovieDto {
  title: string;
  gener: string;
  description: string;
  @IsDateString()
  releaseDate: string;
  poster: string;
}

export class CommentDto {
  comment: string;
  createAt: number;
  @IsEmail()
  email: string;
  movieId: string;
}
