import mongoose from "mongoose";

export const connect = async (url: string) => {
  return new Promise<{text: string, error: unknown}>((resolve, reject) => {
    mongoose.connect(url)
      .then(() => resolve({text: "Connected to MongoDB.", error: null}))
      .catch((error) => reject({text: "Failder connection to MongoDB.", error}))
  });
};

export default connect;
