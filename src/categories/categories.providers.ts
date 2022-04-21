import { CATEGORIES_REPOSITORY } from 'src/common/constants';
import { categories } from './entities/categories.entity';

export const categoriesProviders = [{ provide: CATEGORIES_REPOSITORY, useValue: categories }];