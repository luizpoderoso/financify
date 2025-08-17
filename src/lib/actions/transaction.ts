"use server";

import { auth } from "@/auth";
import { CreateTransactionDTO } from "../dtos/transaction.dto";
import { createTransaction } from "../services/transactionService";
import { revalidatePath } from "next/cache";

// O tipo de retorno agora é mais simples
type ActionResponse = {
  error?: string;
  success?: boolean;
};

// A action agora recebe apenas o formData
export async function createTransactionAction(
  formData: FormData,
): Promise<ActionResponse> {
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
