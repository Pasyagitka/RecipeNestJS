import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { RecipeIngredientsService } from './recipe-ingredients.service';
import { CreateRecipeIngredientDto } from './dto/create-recipe-ingredient.dto';
import { UpdateRecipeIngredientDto } from './dto/update-recipe-ingredient.dto';
import { Public } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('recipe-ingredients')
export class RecipeIngredientsController {
    constructor(private readonly recipeIngredientsService: RecipeIngredientsService) {}

    @Post()
      create(@Body() createRecipeIngredientDto: CreateRecipeIngredientDto) {
          return this.recipeIngredientsService.create(createRecipeIngredientDto);
      }
    
    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.recipeIngredientsService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateRecipeIngredientDto: UpdateRecipeIngredientDto) {
        return this.recipeIngredientsService.update(+id, updateRecipeIngredientDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.recipeIngredientsService.remove(+id);
    }
}
