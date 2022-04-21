import { meals } from "../entities/meals.entity";

export class MealDto {
  id: number;
  meal: string;

  constructor(meal: meals) {
    this.id = meal.id;
    this.meal = meal.meal;
  }
}