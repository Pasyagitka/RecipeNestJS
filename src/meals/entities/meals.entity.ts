import {
  Model,
  Table,
  Column,
  DataType,
  HasMany,
} from 'sequelize-typescript';

import {
  recipes,
} from '../../recipes/entities/recipes.entity';

export interface mealsAttributes {
  id: number;
  meal: string;
}

@Table({ 
  tableName: 'meals', 
  schema: 'public', 
  timestamps: false 
})
export class meals extends Model<mealsAttributes, mealsAttributes> implements mealsAttributes {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;
  
  @Column({ 
    allowNull: true, 
    type: DataType.STRING 
  })
  meal: string;

  @HasMany(() => recipes, {
    onUpdate: "SET NULL",
    onDelete: "SET NULL",
  })
  recipes: recipes[];
}
