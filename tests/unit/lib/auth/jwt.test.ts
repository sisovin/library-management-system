import { assertEquals, assertNotEquals } from "https://deno.land/std/testing/asserts.ts";
import { generateToken, verifyToken, decodeToken } from "../../../src/lib/auth/jwt.ts";

Deno.test("generateToken - should generate a valid JWT", () => {
  const payload = { userId: 1, username: "testuser" };
  const token = generateToken(payload);
  assertNotEquals(token, null);
  assertNotEquals(token, undefined);
});

Deno.test("verifyToken - should verify a valid JWT", async () => {
  const payload = { userId: 1, username: "testuser" };
  const token = generateToken(payload);
  const verifiedPayload = await verifyToken(token);
  assertEquals(verifiedPayload.userId, payload.userId);
  assertEquals(verifiedPayload.username, payload.username);
});

Deno.test("verifyToken - should return null for an invalid JWT", async () => {
  const invalidToken = "invalid.token.here";
  const verifiedPayload = await verifyToken(invalidToken);
  assertEquals(verifiedPayload, null);
});

Deno.test("decodeToken - should decode a valid JWT", () => {
  const payload = { userId: 1, username: "testuser" };
  const token = generateToken(payload);
  const decodedPayload = decodeToken(token);
  assertEquals(decodedPayload[1].userId, payload.userId);
  assertEquals(decodedPayload[1].username, payload.username);
});
