import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommentsCollection, MovieCollection } from 'src/common/collections';
import { getData, getDataById } from 'src/common/dbHelpers';
import { getSignedUrl } from 'src/common/firebaseHelpers';

@Injectable()
export class MovieGetService {

    async getAllMovies() {
        try{
            let movieData =  await getData(MovieCollection);
            let response = []
            for(let i of movieData) {
                let url = ""
                if(i.poster) {
                    url = await getSignedUrl(i.poster)
                }
                response.push({
                    ...i,
                    poster: url
                })
            }
            return response
          }catch (err) {
            throw new HttpException(
              err.message,
              err.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
    }

    async getMovieDataUsingId(id: string) {
        try{
            const movieData = await getDataById(MovieCollection, id);
            if(movieData.poster){
                movieData.poster = await getSignedUrl(movieData.poster);
            }
            const comments = await getDataById(CommentsCollection, id);
            return {
                movieData,
                ...comments
            }
          }catch (err) {
            throw new HttpException(
              err.message,
              err.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
    }
}
