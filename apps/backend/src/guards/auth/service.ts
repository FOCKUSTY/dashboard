import { Request } from "express";

import { MODELS } from "database";
import Hash from "api/hash.api";

const { Auth, User } = MODELS;

class Service {
  public async validateRequest(req: Request) {
    const { successed, id, token, profile_id } = Hash.parse(req);

    if (!successed) return false;

    const findedUser = await Auth.findOne({ id: id });

    if (!findedUser) return false;
    if (findedUser.profile_id !== profile_id) return false;
    if (token !== new Hash().execute(findedUser.access_token)) return false;

    const profileUser = await User.findOne({ id: findedUser.profile_id });

    if (!profileUser) return false;

    return true;
  }
}

export default Service;
