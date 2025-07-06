import { MODELS } from "database";
import { IUser } from "types/user.type";

import { IResponse } from "types/response.type";

const { User } = MODELS;

export class UsersService {
  public async getUser(id: string): Promise<IResponse<IUser>> {
    try {
      const user = await User.findOne({id})
      
      if (!user) { return { successed: false, error: "user not found", data: null } };

      return { successed: true, data: user.toObject(), error: null };
    } catch (error) {
      console.error(error);
      return { successed: false, data: null, error: "unknown error" };
    }
  };
}
