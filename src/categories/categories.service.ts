import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CATEGORIES_REPOSITORY } from 'src/common/constants';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { categories } from './entities/categories.entity';

@Injectable()
export class CategoriesService {
    constructor(@Inject(CATEGORIES_REPOSITORY)
    private readonly categoriesRepository: typeof categories,
    ) {}


    async create(createCategoryDto: CreateCategoryDto) {
        const category = new categories();
        category.category = createCategoryDto.category;
        return category.save();
    }

    async findAll() {
        const categories = await this.categoriesRepository.findAll<categories>();
        return categories.map(category => new CategoryDto(category));
    }

    async findOne(id: number) {
        const category = await this.categoriesRepository.findByPk<categories>(id);
        if (!category) {
            throw new HttpException('No category found', HttpStatus.NOT_FOUND);
        }
        return new CategoryDto(category);
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.categoriesRepository.findByPk<categories>(id);
        category.category = updateCategoryDto.category || category.category;
        return category.save();
    }

    async remove(id: number) {
        const category = await this.categoriesRepository.findByPk<categories>(id);
        await category.destroy();
        return category;
    }
}
