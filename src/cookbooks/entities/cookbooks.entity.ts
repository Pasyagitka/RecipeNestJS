import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { recipes } from '../../recipes/entities/recipes.entity';
import { users } from '../../users/entities/users.entity';

export interface cookbooksAttributes {
    userId: number;
    recipeId: number;
}

@Table({ 
    tableName: 'cookbooks',
    schema: 'public',
    timestamps: false,
})
export class cookbooks extends Model<cookbooksAttributes, cookbooksAttributes>  implements cookbooksAttributes  {
  @ForeignKey(() => users)
  @Column({ 
      primaryKey: true, 
      type: DataType.INTEGER,
  })
  userId: number;

  @ForeignKey(() => recipes)
  @Column({ 
      primaryKey: true, 
      type: DataType.INTEGER,
  })
  recipeId: number;
}
