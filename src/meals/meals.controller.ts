import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Public } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('meals')
export class MealsController {
    constructor(private readonly mealsService: MealsService) {}

    @Post()
    create(@Body() createMealDto: CreateMealDto) {
        return this.mealsService.create(createMealDto);
    }

    @Public()
    @Get()
    findAll() {
        return this.mealsService.findAll();
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.mealsService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
        return this.mealsService.update(+id, updateMealDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.mealsService.remove(+id);
    }
}
