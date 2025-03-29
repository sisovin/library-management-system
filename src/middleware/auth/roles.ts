import { Context } from "https://deno.land/x/oak/mod.ts";
import { db } from "../../db/client.ts";
import { roles, rolePermissions } from "../../db/schema/roles.ts";
import { permissions } from "../../db/schema/permissions.ts";

export const checkRole = (requiredRole: string) => {
  return async (ctx: Context, next: () => Promise<unknown>) => {
    const user = ctx.state.user;

    if (!user || !user.role) {
      ctx.response.status = 403;
      ctx.response.body = { message: "Forbidden" };
      return;
    }

    const userRole = await db.select().from(roles).where(roles.name.eq(user.role)).execute();
    if (!userRole.length) {
      ctx.response.status = 403;
      ctx.response.body = { message: "Forbidden" };
      return;
    }

    const userPermissions = await db.select().from(rolePermissions)
      .innerJoin(permissions, rolePermissions.permissionId.eq(permissions.id))
      .where(rolePermissions.roleId.eq(userRole[0].id))
      .execute();

    const hasRequiredPermission = userPermissions.some((perm: any) => perm.name === requiredRole);
    if (!hasRequiredPermission) {
      ctx.response.status = 403;
      ctx.response.body = { message: "Forbidden" };
      return;
    }

    await next();
  };
};
