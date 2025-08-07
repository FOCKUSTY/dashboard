export const ROUTE = ["guilds", "g"];

export const ROUTES = {
  GET_ALL: "/",
  GET_ONE: "/:id",
  
  GET_WEBHOOKS: "/:id/webhooks",
  GET_ROLES: "/:id/roles",

  POST: "/:id",
  PUT: "/:id",
  PATCH_CONFIG: "/:id/config",
  DELETE: "/:id" // РЕАЛИЗОВАТЬ
} as const;
