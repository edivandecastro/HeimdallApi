import mongoose from 'mongoose'

export default class Database {

  public configMongoose: Object

  public constructor () {
    mongoose.set('useCreateIndex', true)

    this.configMongoose = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }

  public connectMongoBD(): void {
    mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-hfiub.mongodb.net/heimdall?retryWrites=true&w=majority', this.configMongoose);
    // mongoose.connect('mongodb://localhost:27017/heimdall', this.configMongoose);
  }

  public disconnectMongoDB(): void {
    mongoose.disconnect()
  }
}
