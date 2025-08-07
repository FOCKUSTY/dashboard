export const ROUTE = ["guilds", "g"];

export const ROUTES = {
  GET_ALL: "/",
  GET_ONE: "/:id",
  
  GET_WEBHOOKS: "/:id/webhooks",

  POST: "/:id",
  PUT: "/:id",
  PATCH_CONFIG: "/:id/config",
  DELETE: "/:id" // РЕАЛИЗОВАТЬ
} as const;
