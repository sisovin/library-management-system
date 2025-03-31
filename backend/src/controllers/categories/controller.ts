import { Router } from "https://deno.land/x/oak/mod.ts";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../../services/categories.ts";

const router = new Router();

router
  .get("/categories", async (context) => {
    context.response.body = await getCategories();
  })
  .post("/categories", async (context) => {
    const body = await context.request.body().value;
    context.response.body = await createCategory(body);
  })
  .put("/categories/:id", async (context) => {
    const id = context.params.id;
    const body = await context.request.body().value;
    context.response.body = await updateCategory(id, body);
  })
  .delete("/categories/:id", async (context) => {
    const id = context.params.id;
    context.response.body = await deleteCategory(id);
  });

export default router;
