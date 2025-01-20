import { Transform, TransformFnParams } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NumericTransformer } from '../../util/numerictransformer';
import { Category } from '../../category/entities/category.entity';

@Entity({ name: 'tb_games' })
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  game_name: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ type: 'text', nullable: true })
  description: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @IsPositive()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new NumericTransformer(),
  })
  price: number;

  @IsInt()
  @Min(0) // It guarantees that the value is positive or zero
  @Column({ type: 'int', nullable: false })
  stock_quantity: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ type: 'text', nullable: true })
  cover_link: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Category, (category) => category.game, {
    onDelete: 'CASCADE',
  })
  category: Category;
}
