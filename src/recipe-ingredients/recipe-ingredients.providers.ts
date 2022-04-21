import { RECIPE_INGREDIENTS_REPOSITORY } from 'src/common/constants';
import { recipe_ingredients } from './entities/recipe-ingredients.entity';

export const recipeIngredientsProviders = [{ provide: RECIPE_INGREDIENTS_REPOSITORY, useValue: recipe_ingredients }];