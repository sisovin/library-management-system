import { Router } from "https://deno.land/x/oak/mod.ts";
import { createReadingList, getReadingLists, updateReadingList, deleteReadingList } from "../../services/reading-lists.ts";

const router = new Router();

router
  .post("/reading-lists", async (context) => {
    const body = await context.request.body().value;
    context.response.body = await createReadingList(body);
  })
  .get("/reading-lists", async (context) => {
    context.response.body = await getReadingLists();
  })
  .put("/reading-lists/:id", async (context) => {
    const id = context.params.id;
    const body = await context.request.body().value;
    context.response.body = await updateReadingList(id, body);
  })
  .delete("/reading-lists/:id", async (context) => {
    const id = context.params.id;
    context.response.body = await deleteReadingList(id);
  });

export default router;
