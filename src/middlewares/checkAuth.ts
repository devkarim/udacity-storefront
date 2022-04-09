import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import config from '../config';
import { AuthenticationPayload } from '../helpers/utils';

const checkAuth = (req: Request, res: Response, next: () => void) => {
  try {
    const bearer = req.headers.authorization;
    const token = bearer?.split(' ')[1];
    const payload = jwt.verify(
      token!,
      config.JWT_SECRET!
    ) as AuthenticationPayload;
    req.userId = payload.user_id;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Unauthorized.' });
  }
};

export default checkAuth;
