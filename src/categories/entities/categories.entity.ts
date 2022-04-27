import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { recipes } from '../../recipes/entities/recipes.entity';

export interface categoriesAttributes {
  id: number;
  category: string;
}

@Table({
    tableName: 'categories',
    schema: 'public',
    timestamps: false,
})
export class categories extends Model<categoriesAttributes, categoriesAttributes> implements categoriesAttributes {
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
    category: string;

    @HasMany(() => recipes, {
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL',
    })
    recipes: recipes[];
}
