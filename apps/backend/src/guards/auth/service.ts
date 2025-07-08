import { Request } from "express";

import { MODELS } from "database";
import Hash from "api/hash.api";

const { Auth, User } = MODELS;

class Service {
  public async validateRequest(req: Request) {
    const { successed, id, token, profile_id } = Hash.parse(req);

    if (!successed) {
      console.log("User blocked: Hash parse error #0001");
      return false;
    };

    const findedUser = (await Auth.findOne({ id: id }));

    if (!findedUser) {
      console.log("User blocked: User not found #0002");
      return false;
    };
    
    if (findedUser.profile_id !== profile_id) {
      console.log("User blocked: Profile id is not equals #0003")
      return false;
    };
    
    if (token !== new Hash().execute(findedUser.access_token)) {
      console.log("User blocked: Token is not equals #0004");
      return false;
    };

    const profileUser = await User.findOne({ id: findedUser.profile_id });

    if (!profileUser) {
      console.log("User blocked: Profile not found #0005");
      return false;
    };

    console.log("User access granted");
    return true;
  }
}

export default Service;
