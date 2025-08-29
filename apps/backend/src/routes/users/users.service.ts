import type { IUser } from "types/user.type";
import type { IResponse } from "types/promise/response.types";

import type { UserUpdateDto } from "./dto/user-update.dto";

import type { UpdateWriteOpResult, DeleteResult } from "mongoose";
import Services from "services/index";

import { Injectable } from "@nestjs/common";
import { MODELS } from "database";

const { User } = MODELS;

const createError = Services.createError;
const unknownError = Services.createUnknownError("user");

@Injectable()
export class Service {
  public async get(id: string): Promise<IResponse<IUser>> {
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

  public async put(
    id: string,
    user: UserUpdateDto
  ): Promise<IResponse<UpdateWriteOpResult, UpdateWriteOpResult | null>> {
    try {
      const updatedUser = await User.updateOne({ id }, user);

      if (!updatedUser.acknowledged) {
        return createError("user not updated", updatedUser);
      }

      return { successed: true, error: null, data: updatedUser };
    } catch (error) {
      return unknownError.execute(2000, null, error);
    }
  }

  public async delete(
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