import { Request, Response } from 'express'
import User from '../schemas/User'

class UserController {
  public async create(req: Request, res: Response) {
    let { user } = req.body;

    await User.create(user, (err: any, user: any) => {
      if (err) {
        let reason = err.errmsg

        if (err.code == "11000")
          reason = "Usuário já existe!";

        res.status(400).send({ "message": "Ocorreu um erro ao registrar o usuário!", "reason": reason });
      }
      else {
        res.status(200).send({ "message": "Usuário registrado com sucesso!", user_id: user.id });
      }
    });
  }

  public async show(req: Request, res: Response) {
    let id = req.params.id;

    await User.findById(id, (err, user) => {
      if(user) {
        return res.json(user);
      }
      else {
        return res.json({ "message": "Não foi encontrado usuário para o parametro informado." });
      }
    });
  }
}

export default new UserController
