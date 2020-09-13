import express, { Router } from 'express'
import UserController from '../controllers/UserController'
import Auth from '../middlewares/Auth'

class Routes {
  private router: Router;

  public constructor() {
    this.router = Router()
    this.router.use(express.json());
    this.router.use(express.urlencoded({ extended: true }));
  }

  public load(): Router {
    this.loadRoutesForUsers()
    return this.router;
  }

  private loadRoutesForUsers() {
    this.router.post('/users', Auth.verify, UserController.create);
    this.router.get('/users/:id', Auth.verify, UserController.show);
  }
}

export default new Routes
