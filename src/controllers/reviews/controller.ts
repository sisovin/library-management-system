import { Router } from "https://deno.land/x/oak/mod.ts";
import { addReview, getReviews, updateReview, deleteReview } from "./reviews.ts";

const router = new Router();

router
  .post("/reviews", addReview)
  .get("/reviews", getReviews)
  .put("/reviews/:id", updateReview)
  .delete("/reviews/:id", deleteReview);

export default router;
