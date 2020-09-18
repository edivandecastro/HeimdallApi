import { Request, Response } from 'express'
import User from '../schemas/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authConfig from '../config/authConfig.json'

class SessionController {
  public async authenticate(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select('+password');

    if (!user)
      return res.status(404).send({ error: "User not found!" });

    if (!await bcrypt.compare(password, user.password))
      return res.status(400).send({ error: "Invalid password!" });

    user.password = undefined;

    const payload = {
      "sub": user.id
    }

    const token = jwt.sign(payload, authConfig.secret, {
      expiresIn: "2h",
      issuer: "HeimdallApi",
      audience: "token do cliente"
    });

    res.send({ user, token });
  }

  public async tokenValidate(req: Request, res: Response) {
    res.send({ "success" : "Token válido" });
  }
}

export default new SessionController
