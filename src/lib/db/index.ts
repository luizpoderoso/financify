import { drizzle } from "drizzle-orm/postgres-js";
import { Pool } from "pg";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;
const client = new Pool({ connectionString });

export const db = drizzle(client, { schema });
