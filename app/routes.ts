import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),

  // Better Auth API handler
  route("api/auth/*", "routes/api.auth.$.ts"),

  // Auth routes (redirect if already logged in)
  layout("routes/auth.tsx", [
    route("login", "routes/auth.login.tsx"),
    route("signup", "routes/auth.signup.tsx"),
  ]),

  // Registration (requires auth, first-time setup)
  route("register", "routes/register.tsx"),

  // Authenticated app routes
  layout("routes/_app.tsx", [
    route("dashboard", "routes/_app.dashboard.tsx"),
    route("waiting", "routes/_app.waiting.tsx"),
    route("rules", "routes/_app.rules.tsx"),
  ]),

  // Admin routes
  layout("routes/_admin.tsx", [
    route("admin", "routes/_admin.dashboard.tsx"),
    route("admin/users", "routes/_admin.users.tsx"),
    route("admin/teams", "routes/_admin.teams.tsx"),
    route("admin/config", "routes/_admin.config.tsx"),
  ]),
] satisfies RouteConfig;
