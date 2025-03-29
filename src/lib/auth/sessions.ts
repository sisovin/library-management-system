import { create, verify, decode } from "https://deno.land/x/djwt/mod.ts";
import { AUTH_CONSTANTS } from "../../config/auth.ts";

const { JWT_SECRET, TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION } = AUTH_CONSTANTS;

export const generateSessionToken = (payload: object) => {
  return create({ alg: "HS256", typ: "JWT" }, payload, JWT_SECRET);
};

export const verifySessionToken = (token: string) => {
  try {
    return verify(token, JWT_SECRET, "HS256");
  } catch (error) {
    console.error("Invalid session token:", error);
    return null;
  }
};

export const decodeSessionToken = (token: string) => {
  return decode(token);
};

export const generateRefreshToken = (payload: object) => {
  return create({ alg: "HS256", typ: "JWT" }, payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
};

export const verifyRefreshToken = (token: string) => {
  try {
    return verify(token, JWT_SECRET, "HS256");
  } catch (error) {
    console.error("Invalid refresh token:", error);
    return null;
  }
};

export const decodeRefreshToken = (token: string) => {
  return decode(token);
};
