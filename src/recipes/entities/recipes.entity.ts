import { Model, Table, Column, DataType, HasMany, ForeignKey } from 'sequelize-typescript';
import { cookbooks } from '../../cookbooks/entities/cookbooks.entity';
import { recipe_ingredients} from '../../recipe-ingredients/entities/recipe-ingredients.entity';
import { categories } from '../../categories/entities/categories.entity';
import { meals } from '../../meals/entities/meals.entity';
import { users } from '../../users/entities/users.entity';


export interface recipesAttributes {
    id: number;
    categoryId: number;
    authorId: number;
    mealId: number;
    datePublished: number;
    timeToCook: number;
    instruction: string;
    title: string;
}

@Table({ 
    tableName: 'recipes', 
    schema: 'public', 
    timestamps: false 
})
export class recipes extends Model<recipesAttributes, recipesAttributes> implements recipesAttributes {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
    })
    id: number;

    @ForeignKey(() => categories)
    @Column({
        allowNull: true, 
        type: DataType.INTEGER 
    })
    categoryId: number;

    @ForeignKey(() => users)
    @Column({ 
        allowNull: true, 
        type: DataType.INTEGER 
    })
    authorId: number;

    @ForeignKey(() => meals)
    @Column({ 
        allowNull: true, 
        type: DataType.INTEGER 
    })
    mealId: number;

    @Column({ 
        allowNull: true, 
        type: DataType.STRING 
    })
    datePublished: number;

    @Column({ 
        allowNull: true, 
        type: DataType.INTEGER 
    })
    timeToCook: number;

    @Column({ 
        allowNull: true, 
        type: DataType.STRING 
    })
    instruction: string;

    @Column({ 
        allowNull: true, 
        type: DataType.STRING 
    })
    title: string;

    @HasMany(() => cookbooks, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
    })
    cookbooks: cookbooks[];

    @HasMany(() => recipe_ingredients, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
    })
    recipe_ingredients: recipe_ingredients[];
}
