import { superoak } from "https://deno.land/x/superoak/mod.ts";
import { app } from "../../src/app.ts";

Deno.test("Review Flow - Add, Get, Update, Delete Review", async () => {
  const request = await superoak(app);

  // Add a new review
  let response = await request.post("/reviews")
    .send({ bookId: 1, userId: 1, rating: 5, comment: "Great book!" })
    .expect(201);
  const reviewId = response.body.id;

  // Get the added review
  response = await request.get(`/reviews/${reviewId}`)
    .expect(200);
  console.log(response.body);

  // Update the review
  await request.put(`/reviews/${reviewId}`)
    .send({ rating: 4, comment: "Good book!" })
    .expect(200);

  // Get the updated review
  response = await request.get(`/reviews/${reviewId}`)
    .expect(200);
  console.log(response.body);

  // Delete the review
  await request.delete(`/reviews/${reviewId}`)
    .expect(204);

  // Try to get the deleted review
  await request.get(`/reviews/${reviewId}`)
    .expect(404);
});
