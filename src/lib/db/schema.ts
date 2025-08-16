import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).unique().notNull(),
  email: text("email").unique().notNull(),
  // hashedPassword: text("hashed_password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  transactions: many(transactions),
}));

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 50 }).notNull(),
  description: text("description").default("").notNull(),
  amountInCents: integer("amount_in_cents").notNull(),

  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  users: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
}));
