import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game/entities/game.entity';
import { GameModule } from './game/game.module';
import { Category } from './category/entities/category.entity';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_games_store',
      entities: [Game, Category],
      synchronize: true,
      logging: true,
    }),
    GameModule,
    CategoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
