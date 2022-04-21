import { categories } from "../entities/categories.entity";

export class CategoryDto {
    id: number;
    category: string;

    constructor(category: categories) {
        this.id = category.id;
        this.category = category.category;
    }
}
