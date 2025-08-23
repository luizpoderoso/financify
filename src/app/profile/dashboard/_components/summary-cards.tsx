import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormattedTransaction } from "../definitions";

interface SummaryCardsProps {
  transactions: FormattedTransaction[];
}

export default function SummaryCards({ transactions }: SummaryCardsProps) {
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

  const totalProfit = totalRevenue - totalExpense;

  return (
    <div className="flex flex-col sm:flex-row gap-10">
      <Card className="w-full">
        <CardHeader>
          <CardAction className="text-xs sm:text-sm text-right">
            <p className="text-green-400">
              <span className="hidden sm:inline">Revenue:</span>{" "}
              {formatCurrency(totalRevenue)}
            </p>
            <p className="text-red-400">
              <span className="hidden sm:inline">Expense:</span>{" "}
              {formatCurrency(totalExpense)}
            </p>
          </CardAction>
          <CardDescription>Total Profit</CardDescription>
          <CardTitle
            className={`text-3xl ${totalProfit >= 0 ? "text-green-400 hover:text-green-500" : "text-red-400 hover:text-red-500"}  transition`}
          >
            {formatCurrency(totalProfit)}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
