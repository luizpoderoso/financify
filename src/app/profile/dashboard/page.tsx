import { columns } from "./columns";
import { DataTable } from "./_components/data-table";
import AddTransactionForm from "./_components/add-transaction-form";
import SummaryCards from "./_components/summary-cards";
import { FormattedTransaction } from "./definitions";
import { getTransactionsByUserId } from "@/lib/services/transactionService";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const transactions = await getTransactionsByUserId(session.user.id);

  const formatted: FormattedTransaction[] = transactions.map((t) => ({
    category: t.category,
    amount: t.amount,
    type: t.type,
    createdAt: t.createdAt,
  }));

  return (
    <div className="px-3 flex flex-col items-center pt-10 pb-20 [&>*]:w-full [&>*]:max-w-4xl gap-10">
      <SummaryCards transactions={formatted} />
      <DataTable columns={columns} data={formatted} />
      <AddTransactionForm />
    </div>
  );
}
