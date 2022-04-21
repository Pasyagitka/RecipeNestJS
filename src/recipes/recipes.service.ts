import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { RECIPES_REPOSITORY } from 'src/common/constants';
import { meals } from 'src/meals/entities/meals.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipeDto } from './dto/recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { recipes } from './entities/recipes.entity';

@Injectable()
export class RecipesService {
    constructor(@Inject(RECIPES_REPOSITORY)
  private readonly recipesRepository: typeof recipes,
    ) {}

    async findAll() {
        const recipes = await this.recipesRepository.findAll<recipes>({
            include: [meals],
        });
        return recipes.map(recipe => new RecipeDto(recipe));
    }

    async findOne(id: number) {
        const post = await this.recipesRepository.findByPk<recipes>(id, {
            include: [meals],
        });
        if (!post) {
            throw new HttpException('No recipe found', HttpStatus.NOT_FOUND);
        }
        return new RecipeDto(post);
    }

    async create(userId: number, createRecipeDto: CreateRecipeDto) {
        const recipe = new recipes();
        recipe.authorId = userId;
        recipe.title = createRecipeDto.title;
        recipe.mealId = createRecipeDto.mealId;
        recipe.categoryId = createRecipeDto.categoryId;
        recipe.timeToCook = createRecipeDto.timeToCook;
        recipe.instruction = createRecipeDto.instruction;
        return recipe.save();
    }

    private async getUserPost(id: number, userId: number) {
        const recipe = await this.recipesRepository.findByPk<recipes>(id);
        if (!recipe) {
            throw new HttpException('No recipe found', HttpStatus.NOT_FOUND);
        }
        if (recipe.authorId !== userId) {
            throw new HttpException(
                'You are unauthorized to manage this recipe',
                HttpStatus.UNAUTHORIZED,
            );
        }
        return recipe;
    }

    async update(id: number, userId: number, updatePostDto: UpdateRecipeDto) {
        const recipe = await this.getUserPost(id, userId);
        recipe.title = updatePostDto.title || recipe.title;
        recipe.mealId = updatePostDto.mealId || recipe.mealId;
        recipe.categoryId = updatePostDto.categoryId || recipe.categoryId;
        recipe.timeToCook = updatePostDto.timeToCook || recipe.timeToCook;
        recipe.instruction = updatePostDto.instruction || recipe.instruction;
        return recipe.save();
    }

    async delete(id: number, userId: number) {
        const recipe = await this.getUserPost(id, userId);
        await recipe.destroy();
        return recipe;
    }
}



// private async getUserPost(id: number, userId: string) {
//   const post = await this.recipesRepository.findByPk<recipes>(id);
//   if (!post) {
//       throw new HttpException('No post found', HttpStatus.NOT_FOUND);
//   }
//   if (post.userId !== userId) {
//       throw new HttpException(
//           'You are unauthorized to manage this post',
//           HttpStatus.UNAUTHORIZED,
//       );
//   }

//   return post;
// }