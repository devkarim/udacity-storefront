import config from '../config';
import jwt from 'jsonwebtoken';

export type AuthenticationPayload = { user_id: number };

export const generateToken = (payload: AuthenticationPayload) => {
  return jwt.sign(payload, config.JWT_SECRET!);
};
