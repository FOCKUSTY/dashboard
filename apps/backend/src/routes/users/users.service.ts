import { MODELS } from "database";
import { IUser } from "types/user.type";

import { IResponse } from "types/response.type";
import Api from "api";
import { UpdateWriteOpResult } from "mongoose";
import { DeleteResult } from "mongodb";

const { User } = MODELS;

const createError = Api.createError;
const unknownError = Api.createUnknownError("user");

export class Service {
  public async getUser(id: string): Promise<IResponse<IUser>> {
    try {
      const user = await User.findOne({ id });

      if (!user) {
        return createError("user not found", null);
      }

      return { successed: true, data: user.toObject(), error: null };
    } catch (error) {
      return unknownError.execute(1000, null, error);
    }
  }

  public async updateUser(
    id: string,
    user: Partial<IUser>
  ): Promise<IResponse<UpdateWriteOpResult, UpdateWriteOpResult | null>> {
    try {
      const updatedUser = await User.updateOne({ id }, { ...user });

      if (!updatedUser.acknowledged) {
        return createError("user not updated", updatedUser);
      }

      return { successed: true, error: null, data: updatedUser };
    } catch (error) {
      return unknownError.execute(2000, null, error);
    }
  }

  public async deleteUser(
    id: string
  ): Promise<IResponse<DeleteResult, DeleteResult | null>> {
    try {
      const deletedUser = await User.deleteOne({ id });

      if (!deletedUser.acknowledged) {
        return createError("user not deleted", deletedUser);
      }

      return { successed: true, error: null, data: deletedUser };
    } catch (error) {
      return unknownError.execute(3000, null, error);
    }
  }
}
