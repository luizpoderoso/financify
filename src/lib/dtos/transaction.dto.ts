import { z } from "zod";

export const GetTransactionDTO = z.object({
  id: z.number(),
  category: z.string().min(1).max(50),
  description: z.string().default(""),
  amount: z.number().positive().default(0),
  type: z.enum(["income", "expense"]),
  createdAt: z.date(),
});

export type TGetTransactionDTO = z.infer<typeof GetTransactionDTO>;

export const CreateTransactionDTO = z.object({
  category: z
    .string()
    .min(1, "Category is required.")
    .max(50, "Category must be between 1 and 50 characters."),
  description: z.string().optional().default(""),
  amount: z.coerce.number().positive().default(0),
  type: z.enum(["income", "expense"], "Type is required."),
  userId: z.string().min(1, "User ID is required."),
});

export type TCreateTransactionDTO = z.infer<typeof CreateTransactionDTO>;
