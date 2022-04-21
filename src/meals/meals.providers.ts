import { MEALS_REPOSITORY } from 'src/common/constants';
import { meals } from './entities/meals.entity';

export const mealsProviders = [{ provide: MEALS_REPOSITORY, useValue: meals }];