import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db/client';

class Permission extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
}

Permission.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(256),
      allowNull: true,
    },
  },
  {
    tableName: 'permissions',
    sequelize,
  }
);

export default Permission;
