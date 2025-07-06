import { IResponse } from "types/response.type";
import { Cache } from "cache-manager";

export const useCache = <T>(cacheManager: Cache, cache: string) => {
  const cacheEnabled =
    (!!cache && Boolean(cache) && cache !== "false") ||
    typeof cache === "undefined";

  return async <K extends any[] = any[]>({
    getFunction,
    key,
    data
  }: {
    key: string;
    getFunction: (...data: K) => Promise<IResponse<T>>;
    data: K;
  }): Promise<IResponse<T>> => {
    if (cacheEnabled) {
      const valueFromCache = (await cacheManager.get<T>(key)) || false;

      const value = valueFromCache
        ? <IResponse<T>>{
            data: valueFromCache,
            error: null,
            successed: true
          }
        : await getFunction(...data);

      if (!value.successed) {
        return value;
      }
      if (!valueFromCache) {
        cacheManager.set(key, value.data);
      }

      return value;
    }

    const value = await getFunction(...data);

    if (!value.successed) {
      return value;
    }

    cacheManager.set(key, value.data);

    return value;
  };
};
