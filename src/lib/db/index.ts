import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

declare global {
  var db: ReturnType<typeof drizzle> | undefined;
}

let db: ReturnType<typeof drizzle>;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

if (process.env.NODE_ENV === "production") {
  const client = new Pool({ connectionString });
  db = drizzle(client, { schema });
} else {
  if (!global.db) {
    const client = new Pool({ connectionString });
    global.db = drizzle(client, { schema });
  }
  db = global.db;
}

export { db };
