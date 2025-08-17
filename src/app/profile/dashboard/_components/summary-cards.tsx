import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormattedTransaction } from "../definitions";

interface SummaryCardsProps {
  transactions: FormattedTransaction[];
}

export default async function SummaryCards({
  transactions,
}: SummaryCardsProps) {
  const totalRevenue = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-10">
      <Card className="w-full">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-3xl text-green-400 hover:text-green-500 transition">
            {formatCurrency(totalRevenue)}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardDescription>Total Expense</CardDescription>
          <CardTitle className="text-3xl text-red-400 hover:text-red-500 transition">
            {formatCurrency(totalExpense)}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
