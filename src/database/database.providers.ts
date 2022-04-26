import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { categories } from '../categories/entities/categories.entity';
import { cookbooks } from '../cookbooks/entities/cookbooks.entity';
import { ingredients } from '../ingredients/entities/ingredients.entity';
import { meals } from '../meals/entities/meals.entity';
import { recipes } from '../recipes/entities/recipes.entity';
import { users } from '../users/entities/users.entity';
import { recipe_ingredients } from '../recipe-ingredients/entities/recipe-ingredients.entity';

const options = {
  "dialectOptions": {
      "ssl": {
          "rejectUnauthorized": false
      }
  }
}

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(process.env.DATABASE_URL, options);
      sequelize.addModels([
        categories, 
        cookbooks, 
        ingredients, 
        meals, 
        recipes, 
        users, 
        recipe_ingredients,
      ]);
      //await sequelize.sync();
      return sequelize;
    }
  }, 
];
