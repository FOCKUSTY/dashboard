import { Request, Response } from "express";

import { MODELS } from "database";
import Hash from "api/hash.api";

import { Env } from "api";

const { env } = new Env();
const { Auth, User } = MODELS;

const THIRTY_MUNITES = 1000 * 60 * 30;
const getRevalidateTime = (date: number) => {
  return date + Number(env.COOKIE_TOKEN_MAX_AGE) - THIRTY_MUNITES;
}

class Service {
  public async validateRequest(req: Request, res: Response) {
    const { successed, id, token, profile_id, revalidate } = Hash.parse(req);
    
    if (!successed) {
      console.log("User blocked: Hash parse error #0001");
      return false;
    }
    
    const findedUser = await Auth.findOne({ id: id });
    
    if (!findedUser) {
      console.log("User blocked: User not found #0002");
      return false;
    }
    
    if (findedUser.profile_id !== profile_id) {
      console.log("User blocked: Profile id is not equals #0003");
      return false;
    }
    
    if (token !== new Hash().execute(findedUser.access_token)) {
      console.log("User blocked: Token is not equals #0004");
      return false;
    }
    
    const profileUser = await User.findOne({ id: findedUser.profile_id });
    
    if (!profileUser) {
      console.log("User blocked: Profile not found #0005");
      return false;
    }

    const now = new Date().getTime();
    if (Number(revalidate) - now <= THIRTY_MUNITES) {
      res.cookie(`${findedUser.id}-${findedUser.profile_id}-token`, JSON.stringify({
        id: findedUser.id,
        profile_id: findedUser.profile_id,
        token: token,
        revalidate: getRevalidateTime(now)
      }), {
        maxAge: Number(env.COOKIE_TOKEN_MAX_AGE)
      });
    }
    
    console.log("User access granted");
    return true;
  }
}

export default Service;
