import mongoose, { Schema, SchemaTypes } from "mongoose";
import { SchemaParameters } from "types/mongodb.types";

import type { IUser } from "types/user.type";

const data: SchemaParameters<IUser> = {
  id: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },

  avatar_url: { type: SchemaTypes.String, required: true, unique: true },
  username: { type: SchemaTypes.String, required: true, unique: true },
  nickname: { type: SchemaTypes.String, required: false, unique: false },

  created_at: { type: SchemaTypes.String, required: true, unique: false }
};
const keys = Object.keys(data);
const schema = new Schema<IUser>(data);

const database = mongoose.model("user", schema);

export { schema as UserSchema, data as UserData, keys as UserKeys };

export default database;
