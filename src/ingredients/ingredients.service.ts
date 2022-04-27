import { Injectable, Inject } from '@nestjs/common';
import { INGREDIENTS_REPOSITORY } from 'src/common/constants';
import { AlreadyExistsError, NotExistsError } from 'src/common/exceptions';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { IngredientDto } from './dto/ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { ingredients } from './entities/ingredients.entity';

@Injectable()
export class IngredientsService {
    constructor(@Inject(INGREDIENTS_REPOSITORY) private readonly ingredientsRepository: typeof ingredients) {}

    async create(createIngredientDto: CreateIngredientDto) {
        const exists = await this.ingredientsRepository.findOne({ where: { name: createIngredientDto.name } });
        if (exists) throw new AlreadyExistsError('ingredient (name)');

        const ingredient = new ingredients();
        ingredient.name = createIngredientDto.name;
        ingredient.measurement = createIngredientDto.measurement;
        return ingredient.save();
    }

    async findAll() {
        const ingredients = await this.ingredientsRepository.findAll<ingredients>();
        return ingredients.map(ingredient => new IngredientDto(ingredient));
    }

    async findOne(id: number) {
        const post = await this.ingredientsRepository.findByPk<ingredients>(id);
        if (!post) {
            throw new NotExistsError('ingredient');
        }
        return new IngredientDto(post);
    }

    async update(id: number, updateIngredientDto: UpdateIngredientDto) {
        const ingredient = await this.ingredientsRepository.findByPk<ingredients>(id);
        if (!ingredient) throw new NotExistsError('ingredient');
        const duplicateName = await this.ingredientsRepository.findOne({ where: { name: updateIngredientDto.name } });
        if (duplicateName && duplicateName.id !== id) {
            throw new AlreadyExistsError('ingredient');
        }
        ingredient.name = updateIngredientDto.name || ingredient.name;
        ingredient.measurement = updateIngredientDto.measurement || ingredient.measurement;

        return ingredient.save();
    }

    async remove(id: number) {
        const ingredient = await this.ingredientsRepository.findByPk<ingredients>(id);
        if (!ingredient) throw new NotExistsError('ingredient');    
        await ingredient.destroy();
        return ingredient;
    }
}
