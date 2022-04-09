import config from '../config';
import jwt from 'jsonwebtoken';

export const generateToken = (payload: any) => {
  return jwt.sign(payload, config.JWT_SECRET!);
};
