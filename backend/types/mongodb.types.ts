import type {
  Default__v,
  Document,
  FilterQuery,
  IfAny,
  ProjectionType,
  QueryOptions,
  Require_id,
  UpdateQuery,
  UpdateWithAggregationPipeline
} from "mongoose";

import { SCHEMAS } from "database/schemas";
import mongoose from "mongoose";

export type Model = keyof typeof SCHEMAS;
export type Filter<T> = FilterQuery<T>;
export type Update<T> = UpdateQuery<T> | UpdateWithAggregationPipeline;
export type Projection<T> = ProjectionType<T> | null | undefined;
export type Options<T> = QueryOptions<T> | null | undefined;
export type GetData<T> = IfAny<
  T,
  any,
  Document<unknown, {}, T> & Require_id<T>
>[];

export type CreateModelData<T> = Promise<
  IfAny<T, any, Document<unknown, {}, T> & Default__v<Require_id<T>>>
>;

export type UpdateOptions<T, K = T> = {
  filter: Filter<T>;
  update?: Update<K>;
};

export type FindOptions<T> = {
  filter: Filter<T>;
  projection?: Projection<T>;
  options?: Options<T>;
};

export type CleanedObject<T> = { [P in keyof T]: T[P] };
export type RemoveNever<T> = CleanedObject<{
  [P in keyof T as T[P] extends never ? never : P]: T[P];
}>;

export type PickType<T, K = any[]> = T extends K ? T : never;
export type PickTypeInObject<
  T extends { [key: string]: any },
  K = any[]
> = RemoveNever<Required<{ [P in keyof T]: PickType<T[P], K> }>>;

export type SchemaParameters<T> = ConstructorParameters<
  typeof mongoose.Schema<T>
>["0"];
export type ModelData<T> = Omit<T, "id" | "_id">;
export type CreateData<T> = Partial<ModelData<T>>;
export type PickCreateData<T, K extends keyof ModelData<T>> = Partial<
  ModelData<T>
> &
  Pick<ModelData<T>, K>;
