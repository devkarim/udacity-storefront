import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import config from '../config';

const checkAuth = (req: Request, res: Response, next: () => void) => {
  try {
    const bearer = req.headers.authorization;
    const token = bearer?.split(' ')[1];
    jwt.verify(token!, config.JWT_SECRET!);
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Unauthorized.' });
  }
};

export default checkAuth;
