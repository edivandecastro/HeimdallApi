import express from 'express'
import cors from 'cors'
import Database from './config/database'

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
    this.express.get('/', (req, res) => {
      return res.send('Hello World');
    })
  }
}

export default new App().express
