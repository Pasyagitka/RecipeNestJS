import { recipes } from '../entities/recipes.entity';

export class RecipeDto {
    id: number;
    categoryId: number;
    authorId: number;
    mealId: number;
    datePublished: number;
    timeToCook: number;
    instruction: string;
    title: string;

    constructor(recipes: recipes) {
        this.id = recipes.id;
        this.categoryId = recipes.categoryId;
        this.authorId = recipes.authorId;
        this.mealId = recipes.mealId;
        this.datePublished = recipes.datePublished;
        this.timeToCook = recipes.timeToCook;
        this.instruction = recipes.instruction;
        this.title = recipes.title;
    }
}