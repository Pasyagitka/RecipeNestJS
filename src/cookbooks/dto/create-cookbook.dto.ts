import { IsNotEmpty } from 'class-validator';

export class CreateCookbookDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    recipeId: number;
}
