import { Model, Table, Column, DataType, Sequelize, ForeignKey } from 'sequelize-typescript';
import { recipes } from '../../recipes/entities/recipes.entity';
import { ingredients } from '../../ingredients/entities/ingredients.entity';

export interface recipe_ingredientsAttributes {
    id: number;
    recipeId: number;
    ingredientId: number;
    quantity: number;
}

@Table({ 
    tableName: 'recipe_ingredients', 
    schema: 'public', 
    timestamps: false, 
})
export class recipe_ingredients extends Model<recipe_ingredientsAttributes, recipe_ingredientsAttributes> implements recipe_ingredientsAttributes {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
    })
    id: number;

    @ForeignKey(() => recipes)
    @Column({ 
        allowNull: true, 
        type: DataType.INTEGER 
    })
    recipeId: number;

    @ForeignKey(() => ingredients)
    @Column({
        allowNull: true, 
        type: DataType.INTEGER 
    })
    ingredientId: number;

    @Column({
        allowNull: true,
        type: DataType.INTEGER,
        defaultValue: Sequelize.literal('1'),
    })
    quantity: number;
}
