import * as winston from 'winston';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { CookbooksModule } from './cookbooks/cookbooks.module';
import { MealsModule } from './meals/meals.module';
import { RecipesModule } from './recipes/recipes.module';
import { RecipeIngredientsModule } from './recipe-ingredients/recipe-ingredients.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { ReadFromFileModule } from './read-from-file/read-from-file.module';
import { HttpExceptionFilter } from './common/filters/exception.filter';
import { BadRequestExceptionFilter } from './common/filters/bad-request-exception.filter';

@Module({
    imports: [
        WinstonModule.forRoot({
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.ms(),
                        nestWinstonModuleUtilities.format.nestLike(process.env.API_NAME, { prettyPrint: true }),
                    ),
                }),
            ]
        }),
        UsersModule, 
        CategoriesModule, 
        CookbooksModule, 
        MealsModule, 
        RecipesModule, 
        RecipeIngredientsModule, 
        IngredientsModule, 
        DatabaseModule,
        ConfigModule.forRoot(),
        AuthModule,
        TokensModule,
        ReadFromFileModule,
    ],
    controllers: [],
    providers: [{    
        provide: APP_FILTER,
        useClass: HttpExceptionFilter,
    }, {    
        provide: APP_FILTER,
        useClass: BadRequestExceptionFilter,
    },
    ],
})
export class AppModule {}
