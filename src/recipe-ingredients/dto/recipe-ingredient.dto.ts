import { recipe_ingredients } from '../entities/recipe-ingredients.entity';

export class RecipeIngredientDto {
    id: number;
    recipeId: number;
    ingredientId: number;
    quantity: number;

    constructor(recipe_ingredient: recipe_ingredients) {
        this.id = recipe_ingredient.id;
        this.recipeId = recipe_ingredient.recipeId;
        this.ingredientId = recipe_ingredient.ingredientId;
        this.quantity = recipe_ingredient.quantity;
    }
}