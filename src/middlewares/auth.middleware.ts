import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.decode(token) as any;

    if (!decoded?.sub) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = {
      id: decoded.sub,
      email: decoded.email,
      username: decoded.preferred_username,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};
