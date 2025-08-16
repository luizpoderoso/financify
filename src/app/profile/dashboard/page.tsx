import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { columns } from "./columns";
import { transactions } from "./data";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dashboard() {
  const formattedTransactions = transactions.map((transaction) => {
    return {
      ...transaction,
      amount: `${transaction.amount > 0 ? "" : "- "}R$ ${Math.abs(transaction.amount).toFixed(2)}`,
    };
  });

  return (
    <div className="flex flex-col items-center pt-10 pb-20 [&>*]:w-full [&>*]:max-w-4xl gap-10">
      <div className="flex gap-10">
        <Card className="w-full">
          <CardHeader>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-3xl">R$ 750.00</CardTitle>
          </CardHeader>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardDescription>Total Expense</CardDescription>
            <CardTitle className="text-3xl">R$ 250.00</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <DataTable columns={columns} data={formattedTransactions} />
      <form>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Add new transaction</CardTitle>
            <CardDescription>
              Quickly add a new transaction to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex [&>*]:w-full [&>div>label]:ml-1 gap-3">
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  type="text"
                  placeholder="Type category..."
                  maxLength={50}
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select required>
                  <SelectTrigger id="type" name="type" className="w-full">
                    <SelectValue placeholder="Choose type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="Enter amount..."
                  required
                />
              </div>
            </div>
            <Input
              id="description"
              name="description"
              placeholder="Type description..."
              required
            ></Input>
            <Button variant="outline">Add Transaction</Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
