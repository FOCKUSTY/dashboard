type IError<T = null> = {
  successed: false;
  data: T;
  error: string;
};

export const createError = <T = null>(
  error: string,
  data: T | null = null
): IError<T> => {
  return { successed: false, data, error };
};

export const createUnknownError = (prefix: string) => {
  return {
    create: <T = null>(
      code: string | number,
      data: T | null = null
    ): IError<T> => {
      return createError(`unknown error. Code: "${prefix}-${code}"`, data);
    },
    log: (code: string | number, error: unknown) => {
      console.error({ unknown_error: `${prefix}-${code}` }, error);
      return error;
    },
    execute: <T = null>(
      code: string | Number,
      data: T | null = null,
      error: unknown
    ) => {
      console.error({ unknown_error: `${prefix}-${code}` }, error);
      return createError(`unknown error. Code "${prefix}-${code}"`, data);
    }
  } as const;
};
