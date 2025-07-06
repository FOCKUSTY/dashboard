import { join, parse } from "path";
import { readdirSync } from "fs";

const EXTENSION = parse(__filename).ext;
const FILE_FORMAT = new RegExp("[\\w\\W]+\\.module\\" + EXTENSION);

export class Deployer {
  public execute(filesPath = __dirname, data = []) {
    const files = readdirSync(filesPath);

    for (const folder of files) {
      try {
        this.execute(join(filesPath, folder), data);
      } catch {
        console.log(folder, FILE_FORMAT.test(folder));
        if (!FILE_FORMAT.test(folder)) continue;
        console.log(1);

        try {
          require(join(filesPath, folder));
        } catch (error) {
          console.log(error);
        }
        const module = require(join(filesPath, folder)).default;
        console.log({ module });

        data.push(module);
      }
    }

    console.log({ data });

    return data;
  }
}

new Deployer().execute();

export default Deployer;
