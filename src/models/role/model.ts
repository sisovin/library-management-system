import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db/client';
import Permission from '../permission/model';

class Role extends Model {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Role.init(
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
  },
  {
    tableName: 'roles',
    sequelize,
  }
);

Role.belongsToMany(Permission, {
  through: 'RolePermissions',
  as: 'permissions',
  foreignKey: 'roleId',
});

Permission.belongsToMany(Role, {
  through: 'RolePermissions',
  as: 'roles',
  foreignKey: 'permissionId',
});

export default Role;
