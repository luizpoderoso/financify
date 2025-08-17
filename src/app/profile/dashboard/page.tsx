import { columns } from "./columns";
import { data } from "./data";
import { DataTable } from "./_components/data-table";
import AddTransactionForm from "./_components/add-transaction-form";
import SummaryCards from "./_components/summary-cards";
import { Transaction } from "./definitions";

export default function Dashboard() {
  const transactions: Transaction[] = data.map((t) => {
    return {
      id: t.id,
      type: t.amount < 0 ? "expense" : "income",
      category: t.category,
      amount: t.amount,
      date: t.date,
    };
  });

  return (
    <div className="flex flex-col items-center pt-10 pb-20 [&>*]:w-full [&>*]:max-w-4xl gap-10">
      <SummaryCards transactions={transactions} />
      <DataTable columns={columns} data={transactions} />
      <AddTransactionForm />
    </div>
  );
}
