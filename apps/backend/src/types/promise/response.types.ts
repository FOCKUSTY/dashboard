import type { 
  IResponse as Response
} from "types/response.type";

export type IResponse<T, K=null> = Promise<Response<T, K>>;
