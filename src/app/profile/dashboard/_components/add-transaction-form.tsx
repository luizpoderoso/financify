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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ActionResult } from "next/dist/server/app-render/types";
import { useState, useRef } from "react";
import { toast } from "sonner";

interface AddTransactionFormProps {
  createAction: (formData: FormData) => Promise<ActionResult>;
}

export default function AddTransactionForm({
  createAction,
}: AddTransactionFormProps) {
  const [selectKey, setSelectKey] = useState(+new Date());
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleFormSubmit = async (formData: FormData) => {
    if (submitButtonRef.current) {
      submitButtonRef.current.disabled = true;
      submitButtonRef.current.textContent = "Adding...";
    }

    const result = await createAction(formData);

    if (submitButtonRef.current) {
      submitButtonRef.current.disabled = false;
      submitButtonRef.current.textContent = "Add Transaction";
    }

    if (result.success) {
      toast.success("Transaction added successfully!");
      formRef.current?.reset();
      setSelectKey(+new Date());
    } else if (result.error) {
      setError(result.error);
      toast.error(result.error);
    }
  };

  return (
    <form action={handleFormSubmit} ref={formRef}>
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
                placeholder="Wage, Food"
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select key={selectKey} required name="type">
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
              placeholder="Wage from corporation"
            />
          </div>
          <div className="h-4 text-sm font-medium">
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <Button type="submit" variant="outline" ref={submitButtonRef}>
            Add Transaction
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
