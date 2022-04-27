import { Inject, Injectable } from '@nestjs/common';
import { MEALS_REPOSITORY } from 'src/common/constants';
import { AlreadyExistsError, NotExistsError } from 'src/common/exceptions';
import { CreateMealDto } from './dto/create-meal.dto';
import { MealDto } from './dto/meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { meals } from './entities/meals.entity';

@Injectable()
export class MealsService {
    constructor(@Inject(MEALS_REPOSITORY) private readonly mealsRepository: typeof meals) {}

    async create(createMealDto: CreateMealDto) {
        const exists = await this.mealsRepository.findOne({ where: { meal: createMealDto.meal } });
        if (exists) throw new AlreadyExistsError('meal');
        const meal = new meals();
        meal.meal = createMealDto.meal;
        return meal.save();
    }

    async findAll() {
        const meals = await this.mealsRepository.findAll<meals>();
        return meals.map(category => new MealDto(category));
    }

    async findOne(id: number) {
        const meal = await this.mealsRepository.findByPk<meals>(id);
        if (!meal) {
            throw new NotExistsError('meal');
        }
        return new MealDto(meal);
    }

    async update(id: number, updateMealDto: UpdateMealDto) {
        const meal = await this.mealsRepository.findByPk<meals>(id);
        if (!meal) throw new NotExistsError('meal');

        const duplicateName = await  this.mealsRepository.findOne({ where: { meal: updateMealDto.meal } });
        if (duplicateName && duplicateName.id !== id) {
            throw new AlreadyExistsError('meal');
        }

        meal.meal = updateMealDto.meal || meal.meal;
        return meal.save();
    }

    async remove(id: number) {
        const meal = await this.mealsRepository.findByPk<meals>(id);
        if (!meal) throw new NotExistsError('meal');
        await meal.destroy();
        return meal;
    }
}
