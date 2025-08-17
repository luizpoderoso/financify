"use client";

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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { createTransactionAction } from "@/lib/actions/transaction";
import { Input } from "@/components/ui/input";

const initialState = {
  error: null,
  success: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="outline" disabled={pending}>
      {pending ? "Processing Transaction..." : "Add Transaction"}
    </Button>
  );
}

export default function Dashboard() {
  const formattedTransactions = transactions.map((transaction) => {
    return {
      ...transaction,
      amount: `${transaction.amount > 0 ? "" : "- "}R$ ${Math.abs(transaction.amount).toFixed(2)}`,
    };
  });

  const [state, formAction] = useActionState(
    createTransactionAction,
    initialState,
  );

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
      <form action={formAction}>
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
                <Select required name="type">
                  <SelectTrigger className="w-full">
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
            <div>
              <Label className="ml-1" htmlFor="description">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                placeholder="Type description..."
              ></Input>
            </div>
            <div className="h-4 text-sm font-medium">
              {state?.error && <p className="text-red-500">{state.error}</p>}
              {state?.success && (
                <p className="text-green-500">{state.success}</p>
              )}
            </div>
            <SubmitButton />
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
