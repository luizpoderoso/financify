"use client";

import { useState } from "react";
import { DataTable } from "./data-table";
import { ActionResult } from "next/dist/server/app-render/types";
import TransactionDialog from "./transaction-dialog";
import { columns } from "../../../columns";
import { FormattedTransaction } from "../../../definitions";

interface TableProps {
  transactions: FormattedTransaction[];
  deleteAction: (txId: string) => Promise<ActionResult>;
}

export default function Table({ transactions, deleteAction }: TableProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<FormattedTransaction | null>(null);

  const openDialog = (tx: FormattedTransaction) => {
    setSelectedTransaction(tx);
    setIsDialogOpen(true);
  };

  const handleDeleteTransaction = async () => {
    if (!selectedTransaction) return;

    await deleteAction(selectedTransaction.id);
    setIsDialogOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="flex flex-col gap-5">
      <DataTable
        columns={columns}
        data={transactions}
        onRowClick={(tx: FormattedTransaction) => openDialog(tx)}
      />
      {isDialogOpen && selectedTransaction ? (
        <TransactionDialog
          transaction={selectedTransaction}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onDelete={handleDeleteTransaction}
        />
      ) : null}
    </div>
  );
}
