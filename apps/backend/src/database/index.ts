import { Model } from "mongoose";

import {
  CreateData,
  Filter,
  FindOptions,
  Model as Models,
  PickTypeInObject,
  UpdateOptions
} from "src/types/mongodb.types";

import { Helpers } from "./helpers";
import { IStatus } from "types/status.type";

export { SCHEMAS, KEYS, MODELS } from "./schemas";

class Database<T extends { id: string }, K = Partial<T>> {
  private readonly _model: Model<T>;

  public constructor(model: Model<T>) {
    this._model = model;
  }

  public get name(): Models {
    return this._model.modelName as Models;
  }

  public get model() {
    return this._model;
  }

  public static parse = <T extends { id: string }>(data: T, type: Models): T =>
    Helpers.parse<T>(data, type);

  public findLast = async (): Promise<Readonly<T>> => {
    return (await this._model.findOne(
      {},
      {},
      { sort: { "created_at": -1 }, new: true }
    ))!;
  };

  public generateId = async (): Promise<string> => {
    const id = await this._model.countDocuments();

    return `${(id === 0 ? 0 : +(await this.findLast()).id) + 1}`;
  };

  public create = async (doc: CreateData<T> & K) => {
    return await this._model.create({
      ...doc,
      id: await this.id
    });
  };

  public update = async (options: UpdateOptions<T>) => {
    return await this._model.updateOne(options.filter, options.update || {});
  };

  public push = async (options: {
    filter: Filter<T>;
    update: Partial<PickTypeInObject<T, any[]>>;
  }) => {
    const data = await this._model.updateOne(options.filter, {
      $push: {
        ...(options.update as any)
      }
    });

    return data;
  };

  public delete = (filter: Filter<T>) => {
    return this._model.deleteOne({ ...filter });
  };

  public getData = (options: FindOptions<T>): Promise<IStatus<T[]>> => {
    return Helpers.getData<T>(this._model, options);
  };

  public deleteModel = () => {
    return Helpers.deleteModel(this._model.name);
  };

  public static getAllModels = () => {
    return Helpers.getAllModels();
  };

  public static deleteModel = (name: string) => {
    return Helpers.deleteModel(name);
  };

  get id(): Promise<string> {
    return this.generateId();
  }
}

export { Helpers };

export default Database;
