import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, LessThan, MoreThan, Repository } from "typeorm";
import { Game } from "../entities/game.entity";
import { CategoryService } from "../../category/services/category.service";


@Injectable()
export class GameService {

    constructor(
        @InjectRepository(Game)
        private gameRepository: Repository<Game>,
        private categoryService: CategoryService
    ) {}

    async findAll(): Promise<Game[]> {
        return this.gameRepository.find({
            relations:{
                category: true
            }
        });
    }

    async findById(id: number): Promise<Game> {

        const postagem = await this.gameRepository.findOne({
            where: { 
                id 
            },
            relations:{
                category: true
            }
        })

        if(!postagem)
            throw new HttpException('Game not found!', HttpStatus.NOT_FOUND)

        return postagem;
    }

    async findByTitle(game_name: string): Promise<Game[]> {
        return this.gameRepository.find({
            where: {
                game_name: ILike(`%${game_name}%`)
            },
            relations:{
                category: true
            }
        });
    }

    async higherPricesThanRef(price: number): Promise<Game[]> {
        return this.gameRepository.find({
            where: {
                price: MoreThan(price)
            },
            order: {
                id: "ASC"
            },
        });
    }

    async lowerPricesThanRef(price: number): Promise<Game[]> {
        return this.gameRepository.find({
            where: {
                price: LessThan(price)
            },
            order: {
                id: "DESC"
            },
        });
    }

    async create(game: Game): Promise<Game> {

        await this.categoryService.findById(game.category.id);

        return await this.gameRepository.save(game);
    }

    async update(game: Game): Promise<Game>{
        
        await this.findById(game.id);

        await this.categoryService.findById(game.category.id);
        
        return await this.gameRepository.save(game);
    }

    async delete(id: number): Promise<DeleteResult>{
        
        await this.findById(id)

        return await this.gameRepository.delete(id)
    }

}