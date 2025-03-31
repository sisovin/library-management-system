import { Router } from "https://deno.land/x/oak/mod.ts";
import { borrowBook, returnBook, getBorrowedBooks } from "../../services/borrows.ts";

const router = new Router();

router.post("/borrow", async (context) => {
  const { userId, bookId } = await context.request.body().value;
  const result = await borrowBook(userId, bookId);
  context.response.body = result;
});

router.post("/return", async (context) => {
  const { userId, bookId } = await context.request.body().value;
  const result = await returnBook(userId, bookId);
  context.response.body = result;
});

router.get("/borrowed", async (context) => {
  const { userId } = context.request.url.searchParams;
  const result = await getBorrowedBooks(userId);
  context.response.body = result;
});

export default router;
