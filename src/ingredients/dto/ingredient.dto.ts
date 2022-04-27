import { ingredients } from '../entities/ingredients.entity';

export class IngredientDto {
    id: number;
    name: string;
    measurement: string;

    constructor(ingredient: ingredients) {
        this.id = ingredient.id;
        this.name = ingredient.name;
        this.measurement = ingredient.measurement;
    }
}
