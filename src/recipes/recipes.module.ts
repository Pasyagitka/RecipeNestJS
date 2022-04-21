import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { recipesProviders } from './recipes.providers';

@Module({
  controllers: [RecipesController],
  providers: [RecipesService, ...recipesProviders],
})
export class RecipesModule {}
