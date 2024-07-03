import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommentsCollection, MovieCollection } from 'src/common/collections';
import { addById, addRow, deleteById, getData, getDataById, updateById } from 'src/common/dbHelpers';
import { getSignedUrl, uploadFileToFirebase } from 'src/common/firebaseHelpers';
import { CommentDto } from './dto/movie.dto';

@Injectable()
export class MovieService {

    async uploadMoviePoster(file: Express.Multer.File) {
        try{
            const response = await uploadFileToFirebase(file, 'posters','poster');
            return response
          }catch (err) {
            throw new HttpException(
              err.message,
              err.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
    }

    async addMovie(data) {
        try{
            await addRow(MovieCollection, data);
          }catch (err) {
            throw new HttpException(
              err.message,
              err.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
    }

    async deleteMovie (id: string) {
        try{
            await deleteById(MovieCollection, id);
            await deleteById(CommentsCollection, id);
            return {
                message: 'Movie Deleted Successfully!'
            }
          }catch (err) {
            throw new HttpException(
              err.message,
              err.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
    }

    async addComment(data:CommentDto) {
      try {
        try {
          const commetsData = await getDataById(CommentsCollection, data.movieId);
          let newData = commetsData?.comments || [];
          newData = [{
            ...data
          },...newData]
          updateById(CommentsCollection, data.movieId, {
            comments: newData,
          });
          return []
        } catch (err) {
          addById(CommentsCollection, data.movieId, {
            comments: [{
              ...data
            }],
          });
        }
        return {
          message: 'Data Added Succssfully!',
        };
      } catch (err) {
        throw new HttpException(
          err.message,
          err.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    async getComment (id: string) {
      try{
          const response = await getDataById(CommentsCollection, id);
          return response
        }catch (err) {
          throw new HttpException(
            err.message,
            err.status || HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
  }
}
