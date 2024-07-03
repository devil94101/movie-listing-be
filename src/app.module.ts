import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { FavouritesModule } from './favourites/favourites.module';
import { MovieGetModule } from './movie-get/movie-get.module';

@Module({
  imports: [AuthModule, UserModule, MovieModule, FavouritesModule, MovieGetModule],
  providers: [
    
  ]
})
export class AppModule {}
