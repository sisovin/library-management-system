import { Router } from "https://deno.land/x/oak/mod.ts";
import { swaggerDoc } from "../docs/api/swagger.yaml";
import { postmanCollection } from "../docs/api/postman.json";

const router = new Router();

router.get("/swagger", (context) => {
  context.response.body = swaggerDoc;
});

router.get("/postman", (context) => {
  context.response.body = postmanCollection;
});

export default router;
