import { superoak } from "https://deno.land/x/superoak/mod.ts";
import { app } from "../../../src/app.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("POST /login - success", async () => {
  const request = await superoak(app);
  await request.post("/login")
    .send({ email: "test@example.com", password: "password" })
    .expect(200)
    .expect((res) => {
      assertEquals(res.body.token, "some-jwt-token");
    });
});

Deno.test("POST /login - invalid email", async () => {
  const request = await superoak(app);
  await request.post("/login")
    .send({ email: "invalid@example.com", password: "password" })
    .expect(401)
    .expect((res) => {
      assertEquals(res.body.error, "Invalid email or password");
    });
});

Deno.test("POST /login - invalid password", async () => {
  const request = await superoak(app);
  await request.post("/login")
    .send({ email: "test@example.com", password: "invalidpassword" })
    .expect(401)
    .expect((res) => {
      assertEquals(res.body.error, "Invalid email or password");
    });
});

Deno.test("POST /login - missing email", async () => {
  const request = await superoak(app);
  await request.post("/login")
    .send({ password: "password" })
    .expect(400)
    .expect((res) => {
      assertEquals(res.body.errors.length, 1);
    });
});

Deno.test("POST /login - missing password", async () => {
  const request = await superoak(app);
  await request.post("/login")
    .send({ email: "test@example.com" })
    .expect(400)
    .expect((res) => {
      assertEquals(res.body.errors.length, 1);
    });
});
