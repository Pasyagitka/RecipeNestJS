import { Module } from '@nestjs/common';
import { CookbooksService } from './cookbooks.service';
import { CookbooksController } from './cookbooks.controller';
import { cookbooksProviders } from './cookbooks.providers';
import { recipesProviders } from 'src/recipes/recipes.providers';
import { usersProviders } from 'src/users/users.providers';

@Module({
    controllers: [CookbooksController],
    providers: [CookbooksService, ...cookbooksProviders, ...recipesProviders, ...usersProviders],
})
export class CookbooksModule {}
