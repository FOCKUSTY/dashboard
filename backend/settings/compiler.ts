import { Compiler } from "fbit-field/compiler";

import { Settings } from "./settings";

const settings = Object.fromEntries(
  Object.keys(Settings.CONSTANTS.object.available).map((key) => [
    key,
    Object.keys(Settings.CONSTANTS.object.available[key])
  ])
);

const typeCompiler = new Compiler(
  settings,
  __dirname + "\\format.settings.ts",
  {
    settingsFormat(settings) {
      return settings.map((string: string) =>
        string
          .replaceAll("__", "_")
          .toLocaleLowerCase()
        )
    },
    compile(me): any {
      return Object.fromEntries(
        me.keys.map((key) => [
          key,
          me.parse(key).map((key) => `${key}: unknown`)
        ]),
      );
    },
    writeFile(me): string {
      const data = JSON.stringify(me.compile(me), undefined, 2)
        .replaceAll('"', "")
        .replaceAll("'\\n'", "\n");

      return `\nexport type IConfig = ${data};\n`;
    },
  }
);

new Compiler(
  settings,
  __dirname + "\\format.settings.ts",
).execute(typeCompiler.writeFile(typeCompiler));