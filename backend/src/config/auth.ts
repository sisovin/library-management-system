export const AUTH_CONSTANTS = {
  JWT_SECRET: Deno.env.get('JWT_SECRET') || 'default_jwt_secret',
  TOKEN_EXPIRATION: '1h',
  REFRESH_TOKEN_EXPIRATION: '7d',
  SALT_ROUNDS: 10,
};
