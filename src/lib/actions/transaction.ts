"use server";

import { auth } from "@/auth";
import { CreateTransactionDTO } from "../dtos/transaction.dto";
import { createTransaction } from "../services/transactionService";
import { revalidatePath } from "next/cache";

type ActionResponse = {
  error: string | null;
  success: string | null;
};

export async function createTransactionAction(
  previousState: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  // 1. Verificar se o usuário está autenticado
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: "You need to be logged in to create a transaction.",
      success: null,
    };
  }
  const userId = session.user.id;

  // 2. Validar os dados do formulário com nosso novo DTO
  const validation = CreateTransactionDTO.safeParse({
    type: formData.get("type"),
    category: formData.get("category"),
    description: formData.get("description"),
    amount: formData.get("amount"),
    userId: userId,
  });

  if (!validation.success) {
    return {
      error: validation.error.issues.map((e) => e.message).join(", "),
      success: null,
    };
  }

  // 3. Chamar o service para criar a transação no banco
  try {
    // Combinamos os dados validados do formulário com o userId da sessão
    const dto = validation.data;
    await createTransaction(dto);

    // 4. (A MÁGICA) Revalidar o cache da página do dashboard
    revalidatePath("/profile/dashboard"); // <- Use o caminho correto para sua página

    return { success: "Transaction created successfully.", error: null };
  } catch (error) {
    console.error("Error creating transaction:", error);
    return { error: "Could not create transaction.", success: null };
  }
}
