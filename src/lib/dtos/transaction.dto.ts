import { z } from "zod";

export const GetTransactionDTO = z.object({
  id: z.number(),
  category: z.string().min(1).max(50),
  description: z.string().default(""),
  amount: z.number().default(0),
});

export type TGetTransactionDTO = z.infer<typeof GetTransactionDTO>;

export const CreateTransactionDTO = z.object({
  id: z.number(),
  category: z.string().min(1).max(50),
  description: z.string().default(""),
  amountInCents: z.number().default(0),
  userId: z.string(),
});

export type TCreateTransactionDTO = z.infer<typeof CreateTransactionDTO>;
