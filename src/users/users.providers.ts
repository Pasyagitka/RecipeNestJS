import { USERS_REPOSITORY } from 'src/common/constants';
import { users } from './entities/users.entity';

export const usersProviders = [{ provide: USERS_REPOSITORY, useValue: users }];