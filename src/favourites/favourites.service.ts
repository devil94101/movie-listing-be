import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FavouriteCollection, MovieCollection } from 'src/common/collections';
import {
  addById,
  getData,
  getDataById,
  updateById,
} from 'src/common/dbHelpers';
import { getSignedUrl } from 'src/common/firebaseHelpers';

@Injectable()
export class FavouritesService {
  async AddFav(userId: string, movieId: string) {
    try {
      try {
        const favData = await getDataById(FavouriteCollection, userId);
        let newData = favData?.fav || [];
        if (newData.includes(movieId)) {
          newData = newData.filter((ele) => ele !== movieId);
        } else {
          newData.push(movieId);
        }
        updateById(FavouriteCollection, userId, {
          fav: newData,
        });
      } catch (err) {
        addById(FavouriteCollection, userId, {
          fav: [movieId],
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

  async getAllFavs(id: string) {
    try {
      const favData = await getDataById(FavouriteCollection, id);
      return favData?.fav || [];
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getFavData(id: string) {
    try {
      const favData = await getDataById(FavouriteCollection, id);
      if (favData?.fav?.length) {
        const getAllData = [];
        for (let i of favData.fav) {
          getAllData.push(getDataById(MovieCollection, i));
        }
        let response = await Promise.all(getAllData);
        let finalResponse = []
        let c = 0;
        for (let i of response) {
          let url = '';
          if (i.poster) {
            url = await getSignedUrl(i.poster);
          }
          finalResponse.push({
            ...i,
            poster: url,
            id: favData.fav[c]
          });
          c++
        }
        return finalResponse;
      }
      return [];
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
