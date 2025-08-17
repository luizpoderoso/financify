"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createTransactionAction } from "@/lib/actions/transaction";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

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

export default function AddTransactionForm() {
  const [state, formAction] = useActionState(
    createTransactionAction,
    initialState,
  );

  return (
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
  );
}
