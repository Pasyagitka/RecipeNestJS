import { INGREDIENTS_REPOSITORY } from 'src/common/constants';
import { ingredients } from './entities/ingredients.entity';

export const ingredientsProviders = [{ provide: INGREDIENTS_REPOSITORY, useValue: ingredients }];