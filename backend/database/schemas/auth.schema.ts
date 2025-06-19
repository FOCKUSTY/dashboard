import mongoose, { Schema } from "mongoose";

import type { IAuthUser } from "types/auth-user.type";
import type { SchemaParameters } from "types/mongodb.types";

const data: SchemaParameters<IAuthUser> = {
  id: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },

  service_id: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },

  created_at: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false
  },

  profile_id: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false
  },

  access_token: {
    type: mongoose.SchemaTypes.String,
    required: true
  },

  refresh_token: {
    type: mongoose.SchemaTypes.String,
    required: false
  },

  type: {
    type: mongoose.SchemaTypes.String,
    required: true
  }
}
const keys = Object.keys(data);
const schema = new Schema<IAuthUser>(data);

const database = mongoose.model("auth", schema);

export {
  schema as AuthSchema,
  keys as AuthKeys,
  data as AuthData,
};

export default database;
