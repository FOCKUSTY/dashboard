import type { Model as ModelType } from "mongoose";

import { FindOptions } from "types/mongodb.types";
import { IStatus, useStatus, useError } from "types/status.type";

const getData = async <T>(
  Model: ModelType<T>,
  options: FindOptions<T>
): Promise<IStatus<T[], any, boolean>> => {
  try {
    const data = await Model.find(
      options.filter,
      options.projection,
      options.options
    );

    if (!data || data.length === 0) {
      return useError(new Error(`Возможно, таблиц не существует.`), data);
    }

    return useStatus("Таблицы были найдены.", true, { data });
  } catch (err) {
    console.error(err);

    return useError(new Error(`${err}`));
  }
};

export default getData;
