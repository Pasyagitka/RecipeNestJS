import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRecipeDto {
    @IsNotEmpty()
    @IsNumber()
    categoryId: number;

    @IsNotEmpty()
    @IsNumber()
    authorId: number;

    @IsNotEmpty()
    @IsNumber()
    mealId: number;

    datePublished: number;

    timeToCook: number;

    @IsNotEmpty()
    instruction: string;

    @IsNotEmpty()
    title: string;
}
