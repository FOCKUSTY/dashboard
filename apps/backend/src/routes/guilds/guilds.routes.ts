const ROUTE = "guilds";

const ROUTES = {
  GET: "/",
  GET_ONE: "/:id",
  GET_WEBHOOKS: "/:id/webhooks",

  POST: "/",

  PUT: "/:id",
  PATCH: "/:id",

  DELETE: "/:id",
} as const;

export { ROUTE, ROUTES };
