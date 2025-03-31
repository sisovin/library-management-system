import { hash as argon2Hash, verify as argon2Verify } from "npm:argon2";

export const hash = async (password: string): Promise<string> => {
  return await argon2Hash(password);
};

export const verify = async (hashedPassword: string, plainPassword: string): Promise<boolean> => {
  return await argon2Verify(hashedPassword, plainPassword);
};
