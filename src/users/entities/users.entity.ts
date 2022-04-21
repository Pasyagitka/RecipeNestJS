import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  HasMany,
} from 'sequelize-typescript';

import { recipes } from '../../recipes/entities/recipes.entity';
import { cookbooks } from '../../cookbooks/entities/cookbooks.entity';
import { categories } from '../../categories/entities/categories.entity';


export interface usersAttributes {
  id: number;
  email: string;
  login: string;
  password: string;
  isGranted: boolean;
  isActivated: boolean;
  activationLink: string;
  resetPasswordLink: string;
  temporaryPassword: string;
}

@Table({ 
  tableName: 'users', 
  schema: 'public', 
  timestamps: false 
})
export class users extends Model<usersAttributes, usersAttributes> implements usersAttributes {
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
  email: string;

  @Column({ 
    allowNull: true, 
    type: DataType.STRING 
  })
  login: string;

  @Column({ 
    allowNull: true, 
    type: DataType.STRING 
  })
  password: string;

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN,
    defaultValue: Sequelize.literal('false'),
  })
  isGranted: boolean;

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN,
    defaultValue: Sequelize.literal('false'),
  })
  isActivated: boolean;

  @Column({ 
    allowNull: true, 
    type: DataType.STRING 
  })
  activationLink: string;

  @Column({ 
    allowNull: true, 
    type: DataType.STRING 
  })
  resetPasswordLink: string;

  @Column({ 
    allowNull: true, 
    type: DataType.STRING 
  })
  temporaryPassword: string;


  @HasMany(() => recipes, {
    onUpdate: "cascade",
    onDelete: "cascade",
  })
  recipes: recipes[];

  @HasMany(() => cookbooks, {
    onUpdate: "cascade",
    onDelete: "cascade",
  })
  cookbooks: cookbooks[];

}
