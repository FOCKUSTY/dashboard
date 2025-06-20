import childProcces = require('child_process');

import BitField, { BitBuilder } from "fbit-field";
import { Settings, formatSettings, format } from "./settings";

import { join, parse } from "path";
import { existsSync, unlinkSync, writeFileSync } from "fs";

const FILE_NAME = "format.settings.ts";

class Compiler {
  public constructor() {};

  public execute() {
    this.createFile();
    this.writeFile();
    this.formatFile();
  };

  public format(
    type: Capitalize<keyof typeof Settings.CONSTANTS.object.available>
  ) {
    const settings = Settings[type].ALL;
    
    if (settings.length === 0) return [];

    return formatSettings(settings);
  }

  private createFile() {
    const filePath = join(__dirname, FILE_NAME);
    
    if (existsSync(filePath)) unlinkSync(filePath);

    writeFileSync(filePath, "", "utf-8");
  };

  private compile() {
    const settings = Object.fromEntries(Object.keys(Settings.CONSTANTS.object.available).map(key =>
      [key, this.format(
        format(key, true) as Capitalize<keyof typeof Settings.CONSTANTS.object.available>
    )]));

    let offset = 0n;
    return Object.fromEntries(Object.keys(settings).map(key => {
      const bits = new BitBuilder(settings[key]).execute(offset);

      offset |= BitBuilder.resolve(bits);

      return [
        key,
        Object.fromEntries(Object.keys(bits).map(key => [
          `/** @value ${bits[key]} */'\n'` + key,
          `1n << ${BitField.logarithm2(bits[key])}n`
          ]))
        ];
    }));
  };

  private writeFile() {
    const filePath = join(__dirname, FILE_NAME);

    const data = JSON.stringify(this.compile(), undefined, 2)
      .replaceAll("\"", "")
      .replaceAll("}", "} as const")
      .replaceAll("'\\n'", "\n")
      .replaceAll("as const,", "as const,\n")
      .replaceAll("n,", "n,\n");

    const file =
      "\n/**" +
      `\n * - this file was auto genereted by ${parse(__filename).name} ` +
      "\n * - if you see inconsistencies: https://github.com/FOCKUSTY/dashboard/issues " +
      "\n */" +
      `\nexport const settings = ${data};` +
      "\n" +
      "\nexport type Keys = keyof typeof settings;" +
      "\nexport type Settings<T extends Keys> = (typeof settings)[T];" +
      "\nexport type SettingsKeys<T extends Keys> = keyof Settings<T>;"+
      "\n\nexport default settings;\n";

    writeFileSync(filePath, file, "utf-8");
  };

  private formatFile() {
    childProcces.exec(`prettier ${join(__dirname, FILE_NAME)} -w`);
  };
};

new Compiler().execute();