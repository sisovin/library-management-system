import { create, verify, decode } from "https://deno.land/x/djwt/mod.ts";
import { AUTH_CONSTANTS } from "../../config/auth.ts";

const { JWT_SECRET, TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION } = AUTH_CONSTANTS;

// In-memory blacklist for revoked tokens
// In a production environment, this should be stored in Redis or another persistent store
const revokedTokens = new Set<string>();

export const generateSessionToken = (payload: object) => {
  return create({ alg: "HS256", typ: "JWT" }, payload, JWT_SECRET);
};

export const verifySessionToken = (token: string) => {
  try {
    // Check if the token has been revoked
    if (revokedTokens.has(token)) {
      return null;
    }
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
    // Check if the token has been revoked
    if (revokedTokens.has(token)) {
      return null;
    }
    return verify(token, JWT_SECRET, "HS256");
  } catch (error) {
    console.error("Invalid refresh token:", error);
    return null;
  }
};

export const decodeRefreshToken = (token: string) => {
  return decode(token);
};

// Add the missing deleteSession function
export const deleteSession = (token: string): boolean => {
  // Add the token to the blacklist
  revokedTokens.add(token);
  
  // For long-term storage, you might want to:
  // 1. Store revoked tokens in a database
  // 2. Set an expiration time based on the token's expiry
  // 3. Periodically clean up expired tokens
  
  return true;
};