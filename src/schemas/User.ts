import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUserSchema extends Document {
  username: string,
  password: string,
  createdAt: Date,
  updatedAt: Date
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
    }
  },
  {
    strict: true,
    timestamps: true,
  },
);

UserSchema.pre<IUserSchema>('save', async function (next) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(this.password, salt)
  this.password = hash

  next()
})

export default model<IUserSchema>('User', UserSchema)
