import { superoak } from "https://deno.land/x/superoak/mod.ts";
import { app } from "../../../src/app.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("POST /register - successful registration", async () => {
  const request = await superoak(app);
  const response = await request.post("/register")
    .send({ username: "testuser", password: "password123", email: "testuser@example.com" })
    .expect(201);

  assertEquals(response.body.token !== undefined, true);
});

Deno.test("POST /register - missing fields", async () => {
  const request = await superoak(app);
  const response = await request.post("/register")
    .send({ username: "testuser" })
    .expect(400);

  assertEquals(response.body.message, "Missing required fields");
});
