import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { categories } from 'src/categories/entities/categories.entity';
import { CATEGORIES_REPOSITORY, MEALS_REPOSITORY, RECIPES_REPOSITORY, USERS_REPOSITORY } from 'src/common/constants';
import { NotExistsError } from 'src/common/exceptions';
import { meals } from 'src/meals/entities/meals.entity';
import { users } from 'src/users/entities/users.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipeDto } from './dto/recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { recipes } from './entities/recipes.entity';

@Injectable()
export class RecipesService {
    constructor(
        @Inject(RECIPES_REPOSITORY) private readonly recipesRepository: typeof recipes,
        @Inject(CATEGORIES_REPOSITORY) private readonly categoriesRepository: typeof categories,
        @Inject(USERS_REPOSITORY) private readonly usersRepository: typeof users,
        @Inject(MEALS_REPOSITORY) private readonly mealsRepository: typeof meals,
    ) {}

    async findAll() {
        const recipes = await this.recipesRepository.findAll<recipes>({
            raw: true,
            nest: true,
        });
        return recipes.map(recipe => new RecipeDto(recipe));
    }

    async findOne(id: number) {
        const post = await this.recipesRepository.findByPk<recipes>(id);
        if (!post) {
            throw new HttpException('No recipe found', HttpStatus.NOT_FOUND);
        }
        return new RecipeDto(post);
    }

    async create(createRecipeDto: CreateRecipeDto) {
        const category = await this.categoriesRepository.findByPk(createRecipeDto.categoryId);
        if (!category) throw new NotExistsError('categoryId');
    
        const author = await this.usersRepository.findByPk(createRecipeDto.authorId);
        if (!author) throw new NotExistsError('authorId');
    
        const meal = await this.mealsRepository.findByPk(createRecipeDto.mealId);
        if (!meal) throw new NotExistsError('mealId');
        
        const recipe = new recipes();
        recipe.authorId = createRecipeDto.authorId;
        recipe.title = createRecipeDto.title;
        recipe.mealId = createRecipeDto.mealId;
        recipe.datePublished = new Date().toLocaleDateString('en-US');
        recipe.categoryId = createRecipeDto.categoryId;
        recipe.timeToCook = createRecipeDto.timeToCook;
        recipe.instruction = createRecipeDto.instruction;
        return recipe.save();
    }

    async update(id: number, updatePostDto: UpdateRecipeDto) {
        const category = await this.categoriesRepository.findByPk(updatePostDto.categoryId);
        if (!category) throw new NotExistsError('categoryId');
    
        const author = await this.usersRepository.findByPk(updatePostDto.authorId);
        if (!author) throw new NotExistsError('authorId');
    
        const meal = await this.mealsRepository.findByPk(updatePostDto.mealId);
        if (!meal) throw new NotExistsError('mealId');

        const recipe = await this.recipesRepository.findOne({ where: { id } });
        if (!recipe) throw new NotExistsError('recipe');
        recipe.title = updatePostDto.title || recipe.title;
        recipe.mealId = updatePostDto.mealId || recipe.mealId;
        recipe.categoryId = updatePostDto.categoryId || recipe.categoryId;
        recipe.timeToCook = updatePostDto.timeToCook || recipe.timeToCook;
        recipe.instruction = updatePostDto.instruction || recipe.instruction;
        return recipe.save();
    }

    async remove(id: number) {
        const recipe = await this.recipesRepository.findByPk(id);
        if (!recipe) throw new NotExistsError('recipe');
        await recipe.destroy();
        return recipe;
    }
}