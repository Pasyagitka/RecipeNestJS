import { Module } from '@nestjs/common';
import { CookbooksService } from './cookbooks.service';
import { CookbooksController } from './cookbooks.controller';
import { cookbooksProviders } from './cookbooks.providers';

@Module({
  controllers: [CookbooksController],
  providers: [CookbooksService, ...cookbooksProviders],
})
export class CookbooksModule {}
