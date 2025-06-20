import Auth, { AuthSchema, AuthKeys } from "./auth.schema";
import User, { UserSchema, UserKeys } from "./user.schema";

const KEYS = {
  auth: AuthKeys,
  user: UserKeys
} as const;

const SCHEMAS = {
  auth: AuthSchema,
  user: UserSchema
} as const;

const MODELS = {
  Auth,
  User
} as const;

export { KEYS, SCHEMAS, MODELS, AuthSchema, UserSchema };

export default SCHEMAS;
