import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CookbooksService } from './cookbooks.service';
import { CreateCookbookDto } from './dto/create-cookbook.dto';

@UseGuards(JwtAuthGuard)
@Controller('cookbooks')
export class CookbooksController {
    constructor(private readonly cookbooksService: CookbooksService) {}

    @Post()
    create(@Body() createCookbookDto: CreateCookbookDto) {
        return this.cookbooksService.create(createCookbookDto);
    }

    @Public()
    @Get(':id')
    findAll(@Param('id') id: string) {
        return this.cookbooksService.findAllForUser(+id);
    }

    @Delete(':recipeId')
    remove(@Param('recipeId') recipeId: string, @Body('userId') userId: number) {
        return this.cookbooksService.remove(+recipeId, userId);
    }
}
