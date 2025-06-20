import mongoose from "mongoose";

import { Model } from "types/mongodb.types";
import { IStatus, useStatus, useError } from "types/status.type";

const getAllModels = async (): Promise<IStatus<Model[], any, boolean>> => {
  try {
    const data = mongoose.modelNames() as Model[];

    if (!data) {
      return useError(new Error(`Возможно, таблиц не существует.`), []);
    }

    return useStatus("Таблицы успешно найдены.", true, { data });
  } catch (err) {
    console.error(err);

    return useError(new Error(`${err}`));
  }
};

export default getAllModels;
