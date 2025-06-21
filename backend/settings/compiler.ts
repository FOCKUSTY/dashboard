import { Compiler } from "fbit-field/compiler";

import { Settings } from "./settings";

new Compiler(
  Object.fromEntries(
    Object.keys(Settings.CONSTANTS.object.available).map((key) => [
      key,
      Object.keys(Settings.CONSTANTS.object.available[key])
    ])
  ),
  __dirname + "\\format.settings.ts"
).execute();
