import { Module } from '@nestjs/common';
import { RecipeIngredientsService } from './recipe-ingredients.service';
import { RecipeIngredientsController } from './recipe-ingredients.controller';
import { recipeIngredientsProviders } from './recipe-ingredients.providers';

@Module({
  controllers: [RecipeIngredientsController],
  providers: [RecipeIngredientsService, ...recipeIngredientsProviders],
})
export class RecipeIngredientsModule {}
