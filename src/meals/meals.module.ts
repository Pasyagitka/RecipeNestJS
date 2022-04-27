import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { mealsProviders } from './meals.providers';

@Module({
    controllers: [MealsController],
    providers: [MealsService, ...mealsProviders],
})
export class MealsModule {}
