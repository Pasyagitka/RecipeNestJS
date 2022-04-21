import { Injectable, Inject } from '@nestjs/common';
import { INGREDIENTS_REPOSITORY } from 'src/common/constants';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { IngredientDto } from './dto/ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { ingredients } from './entities/ingredients.entity';

@Injectable()
export class IngredientsService {

  constructor(@Inject(INGREDIENTS_REPOSITORY)
  private readonly ingredientsRepository: typeof ingredients,
  ) {}

  create(createIngredientDto: CreateIngredientDto) {
    return 'This action adds a new ingredient';
  }

  async findAll() {
    const ingredients = await this.ingredientsRepository.findAll<ingredients>();
    return ingredients.map(ingredient => new IngredientDto(ingredient));
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredient`;
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return `This action updates a #${id} ingredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredient`;
  }
}
