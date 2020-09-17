import { Schema, model, Document } from 'mongoose'

export interface IRuleSchema extends Document {
  user_id: string,
  resource: string
  actions: string[],
  createdAt: Date,
  updatedAt: Date
}

const RuleSchema = new Schema({
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resource: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    actions: [{
      type: String,
      required: true,
      lowercase: true,
    }],
  },
  {
    timestamps: true,
  }
);

RuleSchema.index({ user_id: 1, resource: 1 }, { unique: true });

export default model<IRuleSchema>('Rule', RuleSchema);
