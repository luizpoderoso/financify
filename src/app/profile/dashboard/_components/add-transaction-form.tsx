"use client";

import { useFormStatus } from "react-dom";
import { createTransactionAction } from "@/lib/actions/transaction";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const initialState = {
  error: null,
  success: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="outline" disabled={pending}>
      {pending ? "Adding..." : "Add Transaction"}
    </Button>
  );
}

export default function AddTransactionForm() {
  const [state, formAction] = useActionState(
    createTransactionAction,
    initialState,
  );
  const [formKey, setFormKey] = useState(() => Math.random().toString());

  useEffect(() => {
    if (state.success) {
      setFormKey(Math.random().toString());
      toast.success("Transação adicionada com sucesso!");
    }
    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} key={formKey}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Add new transaction</CardTitle>
          <CardDescription>
            Quickly add a new transaction to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col md:flex-row [&>*]:w-full [&>div>label]:ml-1 gap-3">
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                required
                defaultValue=""
                placeholder="Wage, Food"
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
                step="0.01"
                required
                defaultValue=""
                placeholder="50.00"
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
              defaultValue=""
              placeholder="Wage from corporation"
            />
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
