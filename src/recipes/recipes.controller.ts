import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Public } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) {}

    @Post()
    create(@Body() createRecipeDto: CreateRecipeDto) {
        return this.recipesService.create(createRecipeDto);
    }

    @Public()
    @Get()
    findAll() {
        return this.recipesService.findAll();
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.recipesService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
        return this.recipesService.update(+id, updateRecipeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.recipesService.remove(+id);
    }
}
