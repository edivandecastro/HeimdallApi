import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

interface IUserSchema extends Document {
  password: String
}

const UserSchema = new Schema({
    username: {
      type: String,
      unique: true,
      index: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    strict: true,
    timestamps: true,
  },
);

UserSchema.pre<IUserSchema>('save', async function (next) {
  let salt = bcrypt.genSaltSync(10)
  const password: string = this.password as string
  let hash = bcrypt.hashSync(password, salt)
  this.password = hash

  next()
})

export default model('User', UserSchema)
