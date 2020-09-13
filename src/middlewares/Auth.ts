import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import authConfig from "../config/authConfig.json";

class Auth {
  public verify(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader)
      return res.status(401).send({ error: 'O token não foi informado' })

    const parts = authHeader.split(' ');

    if (!(parts.length === 2))
      return res.status(401).send({ error: 'Token error' });

    const [ scheme, token ]  = parts;

    if (!/^Bearer$/i.test(scheme))
      return res.status(401).send({ error: 'Token malformado' });

    jwt.verify(token, authConfig.secret, (err: any, decoded: any) => {
      if (err) return res.status(401).send({ error: 'Token expirado' });

      req.userId = decoded.id;

      return next();
    });
  }
}

export default new Auth
