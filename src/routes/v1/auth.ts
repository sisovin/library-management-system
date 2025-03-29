import { Router } from "https://deno.land/x/oak/mod.ts";
import { login } from "../../controllers/auth/login.ts";
import { logout } from "../../controllers/auth/logout.ts";
import { refresh } from "../../controllers/auth/refresh.ts";
import { register } from "../../controllers/auth/register.ts";
import { passwordReset } from "../../controllers/auth/password-reset.ts";

const router = new Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.post("/register", register);
router.post("/password-reset", passwordReset);

export default router;
