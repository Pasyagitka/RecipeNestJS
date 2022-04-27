import { Injectable, Inject } from '@nestjs/common';
import { INGREDIENTS_REPOSITORY, RECIPES_REPOSITORY, RECIPE_INGREDIENTS_REPOSITORY } from 'src/common/constants';
import { NotExistsError } from 'src/common/exceptions';
import { ingredients } from 'src/ingredients/entities/ingredients.entity';
import { recipes } from 'src/recipes/entities/recipes.entity';
import { CreateRecipeIngredientDto } from './dto/create-recipe-ingredient.dto';
import { RecipeIngredientDto } from './dto/recipe-ingredient.dto';
import { UpdateRecipeIngredientDto } from './dto/update-recipe-ingredient.dto';
import { recipe_ingredients } from './entities/recipe-ingredients.entity';

@Injectable()
export class RecipeIngredientsService {
    constructor(
        @Inject(RECIPE_INGREDIENTS_REPOSITORY) private readonly recipeIngredientsRepository: typeof recipe_ingredients,
        @Inject(RECIPES_REPOSITORY) private readonly recipeRepository: typeof recipes,
        @Inject(INGREDIENTS_REPOSITORY) private readonly ingredientsRepository: typeof ingredients,
    ) {}

    async create(createCategoryDto: CreateRecipeIngredientDto) {
        const recipe = await this.recipeRepository.findOne({ where: { id: createCategoryDto.recipeId } });
        if (!recipe) throw new NotExistsError('recipe');

        const ingredient = await this.ingredientsRepository.findOne({ where: { id: createCategoryDto.ingredientId } });
        if (!ingredient) throw new NotExistsError('ingredient');

        const recipeIngredient = new recipe_ingredients();
        recipeIngredient.recipeId = createCategoryDto.recipeId;
        recipeIngredient.ingredientId = createCategoryDto.ingredientId;
        recipeIngredient.quantity = createCategoryDto.quantity;
        return recipeIngredient.save();
    }

    async findOne(id: number) {
        const recipeIngredient = await this.recipeIngredientsRepository.findByPk<recipe_ingredients>(id);
        if (!recipeIngredient) {
            throw new NotExistsError('recipe ingredient');
        }
        return new RecipeIngredientDto(recipeIngredient);
    }

    async update(id: number, updateCategoryDto: UpdateRecipeIngredientDto) {
        const recipe = await this.recipeRepository.findByPk(updateCategoryDto.recipeId);
        if (!recipe) throw new NotExistsError('recipe');

        const ingredient = await this.ingredientsRepository.findByPk(updateCategoryDto.ingredientId);
        if (!ingredient) throw new NotExistsError('ingredient');

        const recipeIngredient = await this.recipeIngredientsRepository.findByPk<recipe_ingredients>(id);
        if (!recipeIngredient) throw new NotExistsError('recipe ingredient');

        recipeIngredient.recipeId = updateCategoryDto.recipeId || recipeIngredient.recipeId;
        recipeIngredient.ingredientId = updateCategoryDto.ingredientId || recipeIngredient.ingredientId;
        recipeIngredient.quantity = updateCategoryDto.quantity || recipeIngredient.quantity;
        return recipeIngredient.save();
    }

    async remove(id: number) {
        const recipeIngredient = await this.recipeIngredientsRepository.findByPk<recipe_ingredients>(id);
        if (!recipeIngredient) throw new NotExistsError('recipe ingredients record');
        await recipeIngredient.destroy();
        return recipeIngredient;
    }

}
