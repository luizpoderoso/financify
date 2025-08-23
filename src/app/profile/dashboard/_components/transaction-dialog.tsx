// Imports do shadcn/ui Dialog
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { FormattedTransaction } from "../definitions";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface TransactionDialogProps {
  transaction: FormattedTransaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // onDelete: () => void;
}

export default function TransactionDialog({
  transaction: tx,
  open,
  onOpenChange,
  // onDelete,
}: TransactionDialogProps) {
  if (!tx) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogTitle className="text-2xl">{tx.category}</DialogTitle>
          <DialogDescription className="-mt-1 font-semibold">
            {tx.description || "No description provided."}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p
            className={`font-medium ${
              tx.type === "income" ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {tx.type === "income" ? "Income" : "Expense"}:{" "}
            <span className="font-bold">
              {tx.amount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </p>
        </div>

        <DialogFooter className="grid grid-cols-2 gap-2 sm:gap-4">
          <Button variant="outline">Update</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
