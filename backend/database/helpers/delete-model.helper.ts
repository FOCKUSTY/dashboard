import mongoose from "mongoose";

import { IStatus, useStatus, useError } from "types/status.type";

const deleteModel = async (
  name: string
): Promise<IStatus<mongoose.Mongoose, any>> => {
  try {
    const data = mongoose.deleteModel(name);

    return useStatus(`Успешно удалена модель ${name}`, true, { data });
  } catch (err) {
    console.log(err);

    return useError(new Error(`${err}`));
  }
};

export default deleteModel;
