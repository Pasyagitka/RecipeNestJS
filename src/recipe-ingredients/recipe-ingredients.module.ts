import { Module } from '@nestjs/common';
import { RecipeIngredientsService } from './recipe-ingredients.service';
import { RecipeIngredientsController } from './recipe-ingredients.controller';
import { recipeIngredientsProviders } from './recipe-ingredients.providers';
import { RecipesModule } from 'src/recipes/recipes.module';
import { recipesProviders } from 'src/recipes/recipes.providers';
import { ingredientsProviders } from 'src/ingredients/ingredients.providers';

@Module({
    imports: [RecipesModule],
    controllers: [RecipeIngredientsController],
    providers: [RecipeIngredientsService, ...recipeIngredientsProviders, ...recipesProviders, ...ingredientsProviders],
})
export class RecipeIngredientsModule {}
