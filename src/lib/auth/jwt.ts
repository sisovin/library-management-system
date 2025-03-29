import { create, verify, decode } from "https://deno.land/x/djwt/mod.ts";
import { AUTH_CONSTANTS } from "../../config/auth.ts";

const { JWT_SECRET, TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION } = AUTH_CONSTANTS;

export const generateToken = (payload: object) => {
  return create({ alg: "HS256", typ: "JWT" }, payload, JWT_SECRET);
};

export const verifyToken = (token: string) => {
  try {
    return verify(token, JWT_SECRET, "HS256");
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const decodeToken = (token: string) => {
  return decode(token);
};
