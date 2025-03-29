import { Router } from "https://deno.land/x/oak/mod.ts";
import { login } from "./login.ts";
import { logout } from "./logout.ts";
import { refresh } from "./refresh.ts";
import { register } from "./register.ts";
import { passwordReset } from "./password-reset.ts";

const router = new Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.post("/register", register);
router.post("/password-reset", passwordReset);

export default router;
