import { superoak } from "https://deno.land/x/superoak/mod.ts";
import { app } from "../../../src/app.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("Create Book", async () => {
  const request = await superoak(app);
  const response = await request.post("/books").send({
    title: "Test Book",
    author: "Test Author",
    publishedDate: "2023-01-01",
    isbn: "1234567890",
    coverImageUrl: "http://example.com/cover.jpg",
  });

  assertEquals(response.status, 201);
  assertEquals(response.body.success, true);
  assertEquals(response.body.data.title, "Test Book");
});

Deno.test("Update Book", async () => {
  const request = await superoak(app);
  const createResponse = await request.post("/books").send({
    title: "Test Book",
    author: "Test Author",
    publishedDate: "2023-01-01",
    isbn: "1234567890",
    coverImageUrl: "http://example.com/cover.jpg",
  });

  const bookId = createResponse.body.data.id;

  const updateResponse = await request.put(`/books/${bookId}`).send({
    title: "Updated Test Book",
  });

  assertEquals(updateResponse.status, 200);
  assertEquals(updateResponse.body.success, true);
  assertEquals(updateResponse.body.data.title, "Updated Test Book");
});

Deno.test("Search Books", async () => {
  const request = await superoak(app);
  const response = await request.get("/books/search").query({
    title: "Test Book",
  });

  assertEquals(response.status, 200);
  assertEquals(response.body.success, true);
  assertEquals(response.body.data.length > 0, true);
});

Deno.test("Upload Book Cover", async () => {
  const request = await superoak(app);
  const createResponse = await request.post("/books").send({
    title: "Test Book",
    author: "Test Author",
    publishedDate: "2023-01-01",
    isbn: "1234567890",
    coverImageUrl: "http://example.com/cover.jpg",
  });

  const bookId = createResponse.body.data.id;

  const uploadResponse = await request.post(`/books/${bookId}/upload-cover`).attach(
    "cover",
    "tests/fixtures/cover.jpg"
  );

  assertEquals(uploadResponse.status, 200);
  assertEquals(uploadResponse.body.success, true);
});
