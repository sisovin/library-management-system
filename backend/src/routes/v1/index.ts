import { Router } from "https://deno.land/x/oak/mod.ts";
import authRoutes from "./auth.ts";
import bookRoutes from "./books.ts";

const router = new Router();

router.use("/auth", authRoutes.routes(), authRoutes.allowedMethods());
router.use("/books", bookRoutes.routes(), bookRoutes.allowedMethods());

export default router;
