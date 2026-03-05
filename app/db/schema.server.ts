import {
  mysqlTable,
  varchar,
  text,
  boolean,
  int,
  timestamp,
  mysqlEnum,
  primaryKey,
} from "drizzle-orm/mysql-core";

// ========================
// Better Auth tables
// ========================

export const user = mysqlTable("user", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),

  // Custom fields
  firstName: varchar("first_name", { length: 255 }),
  graduationYear: int("graduation_year"),
  registrationComplete: boolean("registration_complete")
    .notNull()
    .default(false),
  role: mysqlEnum("role", ["user", "admin"]).notNull().default("user"),
});

export const session = mysqlTable("session", {
  id: varchar("id", { length: 36 }).primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = mysqlTable("account", {
  id: varchar("id", { length: 36 }).primaryKey(),
  accountId: varchar("account_id", { length: 255 }).notNull(),
  providerId: varchar("provider_id", { length: 255 }).notNull(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verification = mysqlTable("verification", {
  id: varchar("id", { length: 36 }).primaryKey(),
  identifier: varchar("identifier", { length: 255 }).notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ========================
// Application tables
// ========================

export const team = mysqlTable("team", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  ownerId: varchar("owner_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const teamMember = mysqlTable(
  "team_member",
  {
    teamId: varchar("team_id", { length: 36 })
      .notNull()
      .references(() => team.id, { onDelete: "cascade" }),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    joinedAt: timestamp("joined_at").notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.teamId, table.userId] })],
);

export const invitation = mysqlTable("invitation", {
  id: varchar("id", { length: 36 }).primaryKey(),
  teamId: varchar("team_id", { length: 36 })
    .notNull()
    .references(() => team.id, { onDelete: "cascade" }),
  inviterId: varchar("inviter_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  inviteeId: varchar("invitee_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  status: mysqlEnum("status", ["pending", "accepted", "declined"])
    .notNull()
    .default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const hackathonConfig = mysqlTable("hackathon_config", {
  id: int("id").primaryKey().autoincrement(),
  state: mysqlEnum("state", ["pre", "during", "post"]).notNull().default("pre"),
  hackathonName: varchar("hackathon_name", { length: 255 })
    .notNull()
    .default("DEPLOY/25"),
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  maxTeamSize: int("max_team_size").notNull().default(4),
});
