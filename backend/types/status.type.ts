export type IStatus<T, K=null, isError extends boolean|null = null> = isError extends null
  ? ({
      text: string;
    } & ({
      successed: true,
      data: T,
      error: null
    } | {
      successed: false,
      data: K,
      error: Error
    }))
  : isError extends true
    ? { text: string, successed: false, data: K, error: Error }
    : { text: string, successed: true, data: T, error: null };

export const useError = <T=null>(error: Error, data?: T): IStatus<T, T, true> => {
  return {
    text: error.message,
    data: data || null,
    error: error,
    successed: false
  };
};

export const useStatus = <
  T,
  S extends boolean,
  M extends string|Error = string,
  K=null,
>(
  text: M,
  successed: S,
  
  status: M extends string
    ? S extends true
      ? { data: T, error?: null }
      : K extends null
        ? { error: Error, data?: K }
        : { error: Error, data: K }
    : { data?: K, error?: Error }
): IStatus<T, K> => {
  if (text instanceof Error) {
    return {
      text: text.message,
      error: text,
      successed: false,
      data: null
    };
  };

  return {
    text,
    data: status.data || null,
    error: status.error || null,
    successed
  } as IStatus<T, K>;
};