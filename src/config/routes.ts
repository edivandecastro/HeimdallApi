import express, { Router } from 'express'
import SessionController from '../controllers/SessionController'
import UserController from '../controllers/UserController'
import RuleController from '../controllers/RuleController'
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
    this.loadRoutesForRules()
    this.loadRoutesForSession()
    return this.router;
  }

  private loadRoutesForUsers() {
    this.router.post('/users', Auth.verify, UserController.create)
    this.router.get('/users/:id', Auth.verify, UserController.show)
  }

  private loadRoutesForRules() {
    this.router.post('/rules', Auth.verify, RuleController.create)
    this.router.post('/rules/authorize', Auth.verify, RuleController.authorize)
    this.router.delete('/rules/:id', Auth.verify, RuleController.destroy)
    this.router.delete('/rules/:id/action/:action', Auth.verify, RuleController.destroyAction)
    this.router.get('/rules/:id/action/:action', Auth.verify, RuleController.addAction)
    this.router.get('/rules/:id', Auth.verify, RuleController.show)
    this.router.get('/rules/user/:user_id', Auth.verify, RuleController.showRulesOfUser)
    this.router.put('/rules/:id', Auth.verify, RuleController.update)
    this.router.put('/rules', Auth.verify, RuleController.updateByUserAndResource)
  }

  private loadRoutesForSession() {
    this.router.post('/authenticate', SessionController.authenticate);
    this.router.get('/authenticate/validate', Auth.verify, SessionController.tokenValidate);
  }
}

export default new Routes
