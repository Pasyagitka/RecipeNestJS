import { Injectable, Inject } from '@nestjs/common';
import { COOKBOOKS_REPOSITORY, RECIPES_REPOSITORY, USERS_REPOSITORY } from 'src/common/constants';
import { AlreadyExistsError, NotExistsError } from 'src/common/exceptions';
import { recipes } from 'src/recipes/entities/recipes.entity';
import { users } from 'src/users/entities/users.entity';
import { CookbookDto } from './dto/cookbook.dto';
import { CreateCookbookDto } from './dto/create-cookbook.dto';
import { cookbooks } from './entities/cookbooks.entity';

@Injectable()
export class CookbooksService {
  constructor(
    @Inject(COOKBOOKS_REPOSITORY) private readonly cookbooksRepository: typeof cookbooks,
    @Inject(RECIPES_REPOSITORY) private readonly recipesRepository: typeof recipes,
    @Inject(USERS_REPOSITORY) private readonly usersRepository: typeof users,
  ) {}
  
  async findAllForUser(userId: number) {
    const cookbooks = await this.cookbooksRepository.findAll<cookbooks>({ where: { userId }});
    if (!cookbooks) {
        throw new NotExistsError('cookbooks');
    }
    return cookbooks.map(cookbook => new CookbookDto(cookbook));
  }

  async create(createCategoryDto: CreateCookbookDto) {
    const exists = await this.cookbooksRepository.findOne({ where: { userId: createCategoryDto.userId, recipeId: createCategoryDto.recipeId} });
    if (exists) throw new AlreadyExistsError('cookbook');

    const recipe = await this.recipesRepository.findOne({ where: { id: createCategoryDto.recipeId } });
    if (!recipe) throw new NotExistsError('recipe');

    const user = await this.usersRepository.findOne({ where: { id: createCategoryDto.userId } });
    if (!user) throw new NotExistsError('user');

    const cookbook = new cookbooks();
    cookbook.userId = createCategoryDto.userId;
    cookbook.recipeId = createCategoryDto.recipeId;
    return cookbook.save();
  }

  async remove(recipeId: number, userId: number) {
      const cookbookRecord = await this.cookbooksRepository.findOne<cookbooks>({ where: {
        recipeId,
        userId,
      }});
      if (!cookbookRecord) throw new NotExistsError('cookbook record');
      await cookbookRecord.destroy();
      return cookbookRecord;
  }
}
