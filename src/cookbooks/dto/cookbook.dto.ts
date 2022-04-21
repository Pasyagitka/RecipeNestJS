import { cookbooks } from "../entities/cookbooks.entity";

export class CookbookDto {
    userId: number;
    recipeId: number;

    constructor(cookbook: cookbooks) {
        this.userId = cookbook.userId;
        this.recipeId = cookbook.recipeId;
    }
}
