import { Router } from "https://deno.land/x/oak/mod.ts";
import { reserveBook, cancelReservation, getReservations } from "../../services/reservations.ts";

const router = new Router();

router.post("/reserve", async (context) => {
  const { userId, bookId } = await context.request.body().value;
  const result = await reserveBook(userId, bookId);
  context.response.body = result;
});

router.post("/cancel", async (context) => {
  const { userId, bookId } = await context.request.body().value;
  const result = await cancelReservation(userId, bookId);
  context.response.body = result;
});

router.get("/reservations", async (context) => {
  const { userId } = context.request.url.searchParams;
  const result = await getReservations(userId);
  context.response.body = result;
});

export default router;
