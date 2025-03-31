import { Router } from "https://deno.land/x/oak/mod.ts";
import { createBook } from "./crud/create.ts";
import { updateBook } from "./crud/update.ts";
import { searchBooks } from "./operations/search.ts";
import { uploadBookCover } from "./operations/upload-cover.ts";

const router = new Router();

router
  .post("/books", createBook)
  .put("/books/:id", updateBook)
  .get("/books/search", searchBooks)
  .post("/books/:id/upload-cover", uploadBookCover);

export default router;
