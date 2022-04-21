import { RECIPES_REPOSITORY } from 'src/common/constants';
import { recipes } from './entities/recipes.entity';

export const recipesProviders = [{ provide: RECIPES_REPOSITORY, useValue: recipes }];