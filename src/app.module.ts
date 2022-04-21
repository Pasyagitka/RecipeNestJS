import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { CookbooksModule } from './cookbooks/cookbooks.module';
import { MealsModule } from './meals/meals.module';
import { RecipesModule } from './recipes/recipes.module';
import { RecipeIngredientsModule } from './recipe-ingredients/recipe-ingredients.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { DatabaseModule } from './database/database.module';
import { config } from './config/config';

@Module({
  imports: [
    UsersModule, 
    CategoriesModule, 
    CookbooksModule, 
    MealsModule, 
    RecipesModule, 
    RecipeIngredientsModule, 
    IngredientsModule, 
    DatabaseModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
