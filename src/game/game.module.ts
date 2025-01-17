import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "./entities/game.entity";
import { GameController } from "./controllers/game.controller";
import { GameService } from "./services/game.service";
import { CategoryModule } from "../category/category.module";

@Module({
    imports: [TypeOrmModule.forFeature([Game]), CategoryModule],
    controllers: [GameController],
    providers: [GameService],
    exports: [TypeOrmModule]
})
export class GameModule {}