"use server";

import { db } from "@/lib/db";
import { transactionsTable } from "../db/schema";
import { desc, eq } from "drizzle-orm";
import {
  GetTransactionDTO,
  TCreateTransactionDTO,
} from "../dtos/transaction.dto";
import z from "zod";

/**
 * Busca todas as transações de um usuário específico.
 * @param userId - Id do usuário.
 * @returns Uma lista de transações (DTO).
 */
export async function getTransactionsByUserId(userId: string) {
  const rawTx = await db
    .select()
    .from(transactionsTable)
    .where(eq(transactionsTable.userId, userId))
    .orderBy(desc(transactionsTable.createdAt));

  const transformedForDto = rawTx.map((t) => ({
    ...t, // Espalha o objeto original primeiro
    amount: t.amountInCents / 100, // Sobrescreve/adiciona o campo 'amount'
  }));

  // Validamos a lista inteira de uma vez
  const validation = GetTransactionDTO.array().safeParse(transformedForDto);

  if (!validation.success) {
    console.error("Erro de validação Zod:", z.treeifyError(validation.error));
    return []; // Retorna um array vazio em caso de falha
  }

  return validation.data;
}

/**
 * Cria uma nova transação.
 * @param dto - Objeto contendo dados da nova transação.
 * @returns A transação criada.
 */
export async function createTransaction(dto: TCreateTransactionDTO) {
  const [transaction] = await db
    .insert(transactionsTable)
    .values({
      category: dto.category,
      description: dto.description,
      amountInCents: dto.amount * 100,
      type: dto.type,
      userId: dto.userId,
    })
    .returning();

  console.log(`\nNew transaction created with success:
  ID: ${transaction.id}
  Name: ${transaction.category}
  User ID: ${transaction.userId}\n`);

  return transaction;
}
