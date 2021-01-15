import Database from '../../config/database'
import User from '../../schemas/User'
import Users from '../seeds/users.json'

interface UserParams {
  username: string,
  password: string
}

class UsersMigrate {
  public async up(params: UserParams) {
    const user =  new User(params)
    await user.save()
    return user
  }
}

const database = new Database()
database.connectMongoBD()

Users.forEach(params => {
  new UsersMigrate().up(params).
    then(user => console.log(user)).
    catch(err => console.log(err)).
    then(() => database.disconnectMongoDB())
});
