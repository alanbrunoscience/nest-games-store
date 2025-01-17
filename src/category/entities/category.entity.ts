import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Game } from "../../game/entities/game.entity";

@Entity({name: "tb_categories"})
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    category_name: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @Column({type: 'text', nullable: true})
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Game, (game) => game.category)
    game: Game[];

}