import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { recipesProviders } from './recipes.providers';
import { categoriesProviders } from 'src/categories/categories.providers';
import { usersProviders } from 'src/users/users.providers';
import { mealsProviders } from 'src/meals/meals.providers';

@Module({
    controllers: [RecipesController],
    providers: [RecipesService, ...recipesProviders, ...categoriesProviders, ...usersProviders, ...mealsProviders],
})
export class RecipesModule {}
