import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormattedTransaction } from "../definitions";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function TransactionDialog({
  transaction: tx,
  onClose,
}: {
  transaction: FormattedTransaction;
  onClose: () => void;
}) {
  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen bg-black opacity-70" />
      <Card className="absolute top-1/2 left-1/2 -translate-1/2 py-8 px-4 w-full max-w-sm">
        <CardHeader>
          <CardAction className="cursor-pointer transition hover:text-slate-500">
            <X onClick={onClose} />
          </CardAction>
          <CardTitle className="text-2xl">{tx.category}</CardTitle>
          <CardDescription className="-mt-1 font-semibold">
            {tx.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="-mt-1">
          <p
            className={`${tx.type === "income" ? "text-green-500" : "text-red-500"}`}
          >
            {tx.type[0].toLocaleUpperCase() + tx.type.slice(1)}:&nbsp;
            <span>
              {tx.amount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </p>
          {/*<div className="mt-5 grid grid-cols-2 gap-4">
            <Button variant="outline">Update Transaction</Button>
            <Button variant="destructive">Delete Transaction</Button>
          </div>*/}
        </CardContent>
      </Card>
    </>
  );
}
