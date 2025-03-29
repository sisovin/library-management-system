import { assertEquals, assertNotEquals } from "https://deno.land/std/testing/asserts.ts";
import { UserRepository } from "../../../src/models/user/repository.ts";
import { User, NewUser } from "../../../src/models/user/model.ts";

Deno.test("UserRepository.createUser", async () => {
  const repo = new UserRepository();
  const newUser: NewUser = {
    username: "testuser",
    email: "testuser@example.com",
    password: "password123",
    isActive: true,
  };
  const user = await repo.createUser(newUser);
  assertEquals(user.username, newUser.username);
  assertEquals(user.email, newUser.email);
  assertNotEquals(user.password, newUser.password); // Password should be hashed
  assertEquals(user.isActive, newUser.isActive);
});

Deno.test("UserRepository.getUserById", async () => {
  const repo = new UserRepository();
  const newUser: NewUser = {
    username: "testuser",
    email: "testuser@example.com",
    password: "password123",
    isActive: true,
  };
  const createdUser = await repo.createUser(newUser);
  const user = await repo.getUserById(createdUser.id);
  assertEquals(user?.id, createdUser.id);
  assertEquals(user?.username, createdUser.username);
  assertEquals(user?.email, createdUser.email);
});

Deno.test("UserRepository.getUserByEmail", async () => {
  const repo = new UserRepository();
  const newUser: NewUser = {
    username: "testuser",
    email: "testuser@example.com",
    password: "password123",
    isActive: true,
  };
  const createdUser = await repo.createUser(newUser);
  const user = await repo.getUserByEmail(createdUser.email);
  assertEquals(user?.id, createdUser.id);
  assertEquals(user?.username, createdUser.username);
  assertEquals(user?.email, createdUser.email);
});

Deno.test("UserRepository.updateUser", async () => {
  const repo = new UserRepository();
  const newUser: NewUser = {
    username: "testuser",
    email: "testuser@example.com",
    password: "password123",
    isActive: true,
  };
  const createdUser = await repo.createUser(newUser);
  const updatedUser = await repo.updateUser(createdUser.id, { username: "updateduser" });
  assertEquals(updatedUser?.username, "updateduser");
});

Deno.test("UserRepository.deleteUser", async () => {
  const repo = new UserRepository();
  const newUser: NewUser = {
    username: "testuser",
    email: "testuser@example.com",
    password: "password123",
    isActive: true,
  };
  const createdUser = await repo.createUser(newUser);
  const deleteResult = await repo.deleteUser(createdUser.id);
  assertEquals(deleteResult, true);
  const user = await repo.getUserById(createdUser.id);
  assertEquals(user, null);
});
