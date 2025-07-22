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

const updateCache = async <T, K extends any[] = any[]>({
  data,
  getFunction,
  key,
  cache
}: {
  key: string;
  getFunction: (...data: K) => Promise<IResponse<T>>;
  data: K;
  cache: Map<string, { date: number; data: T }>;
}) => {
  const { data: value, successed } = await getFunction(...data);
  if (!successed) return null;

  cache.set(key, {
    date: new Date().getTime(),
    data: value
  });

  return value;
};

// one hour
export const useRawCache = <T>(
  cache: Map<string, { date: number; data: T }>,
  cacheAge: number = 3_600_000
) => {
  return async <K extends any[] = any[]>({
    getFunction,
    key,
    data
  }: {
    key: string;
    getFunction: (...data: K) => Promise<IResponse<T>>;
    data: K;
  }) => {
    const now = new Date().getTime();
    const fromCache = cache.get(key);

    if (!fromCache) {
      return updateCache({ cache, data, getFunction, key });
    }

    if (fromCache.date - now > cacheAge) {
      return updateCache({ cache, data, getFunction, key });
    }

    return fromCache.data;
  };
};
