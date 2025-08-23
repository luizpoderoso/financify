import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getTransactionsByUserId } from "@/lib/services/transactionService"; // Supondo o nome
import AddTransactionForm from "./_components/add-transaction-form";
import { FormattedTransaction } from "./definitions";
import { createTransactionAction } from "@/lib/actions/transaction";
import ViewArea from "./_components/view-area";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const transactions = await getTransactionsByUserId(session.user.id);

  const formatted: FormattedTransaction[] = transactions.map((t) => ({
    id: t.id,
    category: t.category,
    description: t.description,
    amount: t.amount,
    type: t.type,
    createdAt: t.createdAt,
  }));

  return (
    <div className="px-3 flex flex-col items-center py-10 [&>*]:w-full [&>*]:max-w-4xl gap-10">
      <ViewArea data={formatted} />
      <AddTransactionForm createAction={createTransactionAction} />
    </div>
  );
}
