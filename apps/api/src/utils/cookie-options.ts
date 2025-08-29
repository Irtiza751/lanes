import { CookieOptions } from 'express';

export const accessTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  path: '/',
  secure: false, // Set to true if using HTTPS
  maxAge: 15 * 60 * 1000, // 15 minutes
};

export const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  path: '/',
  secure: false, // Set to true if using HTTPS
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};
