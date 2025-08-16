import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/db/schema.ts", // Aponta para o nosso arquivo de schema
  out: "./drizzle", // Pasta onde as migrações serão salvas
  dialect: "postgresql", // Especifica que estamos usando PostgreSQL
  dbCredentials: {
    // Puxa a URL do banco de dados do nosso arquivo .env
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
