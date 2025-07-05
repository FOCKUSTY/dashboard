import { SCHEMAS, KEYS } from "../schemas";

const parse = <T extends { id: string }>(
  data: T,
  type: keyof typeof SCHEMAS
): T => {
  const output: { [key: string]: unknown } = {};
  const keys = KEYS[type];

  keys.forEach((k: string) => {
    output[k] = (data as { [key: string]: unknown })[k];
  });

  return output as T;
};

export default parse;
