export type AllPartial<T extends {[key: string]: unknown}> = Partial<{
  [P in keyof T]: T[P] extends {[key: string]: unknown} ?  Partial<AllPartial<T[P]>> : T[P];
}>;
