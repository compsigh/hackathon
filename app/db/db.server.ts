import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema.server";
import { env } from "~/lib/env.server";

const pool = mysql.createPool(env.DATABASE_URL);

export const db = drizzle(pool, { schema });
