export type IResponse<T, K = null> =
  | {
      successed: true;
      error: null;
      data: T;
    }
  | {
      successed: false;
      error: string;
      data: K;
    };
