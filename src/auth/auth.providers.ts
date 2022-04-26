import { USERS_REPOSITORY } from 'src/common/constants';
import { users } from '../users/entities/users.entity';

export const categoriesProviders = [{ provide: USERS_REPOSITORY, useValue: users }];
