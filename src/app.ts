import express from 'express'
import cors from 'cors'
import Database from './config/database'
import Routes from './config/routes'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()
    this.database()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(cors())
  }

  private database (): void {
    const database = new Database()
    database.connectMongoBD()
  }

  private routes (): void {
    this.express.use('/heimdall', Routes.load())
  }
}

export default new App().express
