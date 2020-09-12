import express from 'express'
import cors from 'cors'
import Database from './config/database'

export default class App {
  public express: express.Application

  public constructor () {
    this.express = express()
    this.database()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database (): void {
    const database = new Database()
    database.connectMongoBD()
  }
}
