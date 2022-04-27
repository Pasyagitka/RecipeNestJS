import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { recipe_ingredients } from '../../recipe-ingredients/entities/recipe-ingredients.entity';

export interface ingredientsAttributes {
    id: number;
    name: string;
    measurement: string;
}

@Table({ 
    tableName: 'ingredients', 
    schema: 'public', 
    timestamps: false,
})
export class ingredients extends Model<ingredientsAttributes, ingredientsAttributes> implements ingredientsAttributes {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
    })
    id: number;

    @Column({ 
        allowNull: true, 
        type: DataType.STRING, 
    })
    name: string;
    
    @Column({ 
        allowNull: true, 
        type: DataType.STRING,
    })
    measurement: string;

    @HasMany(() => recipe_ingredients, {
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL',
    })
    recipe_ingredients: recipe_ingredients[];
}
