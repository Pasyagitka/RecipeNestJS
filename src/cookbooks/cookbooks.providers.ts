import { COOKBOOKS_REPOSITORY } from 'src/common/constants';
import { cookbooks } from './entities/cookbooks.entity';

export const cookbooksProviders = [{ provide: COOKBOOKS_REPOSITORY, useValue: cookbooks }];