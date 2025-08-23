"use server";

import { auth } from "@/auth";
import { CreateTransactionDTO } from "../dtos/transaction.dto";
import {
  createTransaction,
  deleteTransaction,
} from "../services/transactionService";
import { revalidatePath } from "next/cache";
import { ActionResult } from "next/dist/server/app-render/types";

export async function createTransactionAction(
  formData: FormData,
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You need to be logged in to create a transaction." };
  }

  const validation = CreateTransactionDTO.safeParse({
    type: formData.get("type"),
    category: formData.get("category"),
    description: formData.get("description"),
    amount: formData.get("amount"),
    userId: session.user.id,
  });

  if (!validation.success) {
    return {
      error: validation.error.issues.map((e) => e.message).join(", "),
    };
  }

  try {
    await createTransaction(validation.data);

    revalidatePath("/profile/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error creating transaction:", error);
    return { error: "Could not create transaction." };
  }
}

export async function deleteTransactionAction(
  txId: string,
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You need to be logged in to delete a transaction." };
  }

  try {
    const tx = await deleteTransaction(txId);

    if (tx) {
      revalidatePath("/profile/dashboard");
      return { success: true };
    }

    return { error: "Transaction not found." };
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return { error: "Could not delete transaction." };
  }
}
