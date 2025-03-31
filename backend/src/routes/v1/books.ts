import { Router } from "https://deno.land/x/oak/mod.ts";
import { createBook } from "../../controllers/books/crud/create.ts";
import { updateBook } from "../../controllers/books/crud/update.ts";
import { searchBooks } from "../../controllers/books/operations/search.ts";
import { uploadBookCover } from "../../controllers/books/operations/upload-cover.ts";

const router = new Router();

router
  .post("/books", createBook)
  .put("/books/:id", updateBook)
  .get("/books/search", searchBooks)
  .post("/books/:id/upload-cover", uploadBookCover);

export default router;
