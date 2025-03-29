import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak/mod.ts";
import app from "../../src/app.ts";

Deno.test("Borrow Flow - User can borrow and return a book", async () => {
  const request = await superoak(app);

  // Register a new user
  let response = await request.post("/api/v1/auth/register")
    .send({ username: "testuser", email: "testuser@example.com", password: "password" });
  assertEquals(response.status, 201);
  const userId = response.body.id;

  // Login the user
  response = await request.post("/api/v1/auth/login")
    .send({ email: "testuser@example.com", password: "password" });
  assertEquals(response.status, 200);
  const token = response.body.token;

  // Create a new book
  response = await request.post("/api/v1/books")
    .set("Authorization", `Bearer ${token}`)
    .send({ title: "Test Book", author: "Test Author", publishedDate: "2021-01-01", isbn: "1234567890" });
  assertEquals(response.status, 201);
  const bookId = response.body.id;

  // Borrow the book
  response = await request.post("/api/v1/borrows/borrow")
    .set("Authorization", `Bearer ${token}`)
    .send({ userId, bookId });
  assertEquals(response.status, 200);
  assertEquals(response.body.message, "Book borrowed successfully");

  // Return the book
  response = await request.post("/api/v1/borrows/return")
    .set("Authorization", `Bearer ${token}`)
    .send({ userId, bookId });
  assertEquals(response.status, 200);
  assertEquals(response.body.message, "Book returned successfully");
});
