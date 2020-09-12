import express from 'express'
import cors from 'cors'
import Database from './config/database'
import UserController from './controllers/UserController'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()
    this.database()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database (): void {
    const database = new Database()
    database.connectMongoBD()
  }

  private routes (): void {
    const router = this.express
    router.post('/users', UserController.create);
    router.get('/users/:id', UserController.show);
  }
}

export default new App().express
