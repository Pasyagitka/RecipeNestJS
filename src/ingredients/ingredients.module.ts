import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { ingredientsProviders } from './ingredients.providers';

@Module({
  controllers: [IngredientsController],
  providers: [IngredientsService, ...ingredientsProviders],
})
export class IngredientsModule {}
