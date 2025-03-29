import Role from './model';
import Permission from '../permission/model';

class RoleRepository {
  async createRole(name: string, permissions: string[]) {
    const role = await Role.create({ name });
    if (permissions && permissions.length > 0) {
      const permissionRecords = await Permission.findAll({
        where: { name: permissions },
      });
      await role.addPermissions(permissionRecords);
    }
    return role;
  }

  async getRoleById(id: number) {
    return await Role.findByPk(id, {
      include: [
        {
          model: Permission,
          as: 'permissions',
        },
      ],
    });
  }

  async getAllRoles() {
    return await Role.findAll({
      include: [
        {
          model: Permission,
          as: 'permissions',
        },
      ],
    });
  }

  async updateRole(id: number, name: string, permissions: string[]) {
    const role = await Role.findByPk(id);
    if (!role) {
      throw new Error('Role not found');
    }
    role.name = name;
    await role.save();

    if (permissions && permissions.length > 0) {
      const permissionRecords = await Permission.findAll({
        where: { name: permissions },
      });
      await role.setPermissions(permissionRecords);
    }
    return role;
  }

  async deleteRole(id: number) {
    const role = await Role.findByPk(id);
    if (!role) {
      throw new Error('Role not found');
    }
    await role.destroy();
  }
}

export default new RoleRepository();
