const ROUTE = "guilds";

const ROUTES = {
  GET: "/",
  GET_ONE: "/:id",
  
  GET_WEBHOOKS: "/:id/webhooks",
  GET_ROLES: "/:id/roles",

  POST: "/",

  PUT: "/:id",
  PATCH_CONFIG: "/:id/config",

  DELETE: "/:id",
} as const;

export { ROUTE, ROUTES };
