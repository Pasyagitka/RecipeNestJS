import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Public } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('ingredients')
export class IngredientsController {
    constructor(private readonly ingredientsService: IngredientsService) {}

    @Post()
    create(@Body() createIngredientDto: CreateIngredientDto) {
        return this.ingredientsService.create(createIngredientDto);
    }

    @Public()
    @Get()
    findAll() {
        return this.ingredientsService.findAll();
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ingredientsService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateIngredientDto: UpdateIngredientDto) {
        return this.ingredientsService.update(+id, updateIngredientDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ingredientsService.remove(+id);
    }
}
