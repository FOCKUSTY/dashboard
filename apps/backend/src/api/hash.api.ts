import crypto from "crypto";

import Env from "./env";
import { Request } from "express";

const { env } = new Env();

const PARSE_ERROR = {
  successed: false,
  id: false,
  profile_id: false,
  token: false
} as const;
type ParseReturnType =
  | Readonly<{
      successed: true;
      id: string;
      profile_id: string;
      token: string;
    }>
  | typeof PARSE_ERROR;

class Hash {
  private readonly _hmac: crypto.Hmac;

  public constructor() {
    this._hmac = crypto.createHmac("sha512", env.HASH_KEY);
  }

  public execute(data: string) {
    this._hmac.update(data);
    return this._hmac.digest("hex");
  }

  public static parse(token: string | Request): ParseReturnType {
    if (typeof token !== "string" && !token.headers.authentication)
      return PARSE_ERROR;

    const {
      id,
      profile_id,
      token: hash
    } = typeof token === "string"
      ? JSON.parse(token)
      : JSON.parse(token.headers.authentication.toString());

    if (!id || !hash || !profile_id) return PARSE_ERROR;

    return { successed: true, id, profile_id, token: hash } as const;
  }
}

export default Hash;
