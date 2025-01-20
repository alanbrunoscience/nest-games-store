import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFloatPipe,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { GameService } from '../services/game.service';
import { Game } from '../entities/game.entity';

@Controller('/games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Game[]> {
    return this.gameService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Game> {
    return this.gameService.findById(id);
  }

  @Get('/title/:game_name')
  @HttpCode(HttpStatus.OK)
  findByTitle(@Param('game_name') game_name: string): Promise<Game[]> {
    return this.gameService.findByTitle(game_name);
  }

  @Get('/highest-prices/:price')
  @HttpCode(HttpStatus.OK)
  higherPricesThanRef(
    @Param('price', ParseFloatPipe) price: number,
  ): Promise<Game[]> {
    return this.gameService.higherPricesThanRef(price);
  }

  @Get('/lowest-prices/:price')
  @HttpCode(HttpStatus.OK)
  lowerPricesThanRef(
    @Param('price', ParseFloatPipe) price: number,
  ): Promise<Game[]> {
    return this.gameService.lowerPricesThanRef(price);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() game: Game): Promise<Game> {
    return this.gameService.create(game);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() game: Game): Promise<Game> {
    return this.gameService.update(game);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.gameService.delete(id);
  }
}
