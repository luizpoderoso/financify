import { columns } from "./columns";
import { transactions } from "./data";
import { DataTable } from "./data-table";

export default function Dashboard() {
  const formattedTransactions = transactions.map((transaction) => {
    return {
      ...transaction,
      amount: `${transaction.amount > 0 ? "" : "-"}R$ ${Math.abs(transaction.amount).toFixed(2)}`,
    };
  });

  return (
    <div className="flex justify-center py-20 [&>*]:w-full [&>*]:max-w-3xl">
      <DataTable columns={columns} data={formattedTransactions} />
    </div>
  );
}
