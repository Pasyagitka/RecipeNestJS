import { Injectable, Inject } from '@nestjs/common';
import { CATEGORIES_REPOSITORY } from 'src/common/constants';
import { AlreadyExistsError, NotExistsError } from 'src/common/exceptions';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { categories } from './entities/categories.entity';

@Injectable()
export class CategoriesService {
    constructor(@Inject(CATEGORIES_REPOSITORY) private readonly categoriesRepository: typeof categories) {}

    async create(createCategoryDto: CreateCategoryDto) {
        const exists = await this.categoriesRepository.findOne({ where: { category: createCategoryDto.category } });
        if (exists) throw new AlreadyExistsError();
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
            throw new NotExistsError('category');
        }
        return new CategoryDto(category);
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.categoriesRepository.findByPk<categories>(id);
        if (!category) throw new NotExistsError('category');
        const duplicateName = await this.categoriesRepository.findOne({ where: { category: updateCategoryDto.category } });
        if (duplicateName && duplicateName.id !== id) {
            throw new AlreadyExistsError('category');
        }
        category.category = updateCategoryDto.category || category.category;
        return category.save();
    }

    async remove(id: number) {
        const category = await this.categoriesRepository.findByPk<categories>(id);
        if (!category) throw new NotExistsError('category');    
        await category.destroy();
        return category;
    }
}
