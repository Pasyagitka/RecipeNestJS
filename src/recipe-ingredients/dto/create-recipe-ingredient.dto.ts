import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRecipeIngredientDto {
    @IsNotEmpty()
    @IsNumber()
    recipeId: number;

    @IsNotEmpty()
    @IsNumber()
    ingredientId: number;
    
    quantity: number;
}
