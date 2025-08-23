"use client";

import { useState } from "react";
import { FormattedTransaction, MonthYearTransaction } from "../../definitions";
import { DataTable } from "./data-table";
import { columns } from "../../columns";
import DateSelect from "./date-select";
import TransactionDialog from "../transaction-dialog";

export default function Table({
  transactions,
}: {
  transactions: FormattedTransaction[];
}) {
  const dateFormatted = formatTransactions(transactions);
  const [selectedDate, setSelectedDate] = useState<FormattedTransaction[]>(
    dateFormatted[0].transactions,
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<FormattedTransaction | null>(null);

  const openDialog = (tx: FormattedTransaction) => {
    setSelectedTransaction(tx);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-5">
      <DateSelect
        setSelectedDate={setSelectedDate}
        dateFormatted={dateFormatted}
      />
      <DataTable
        columns={columns}
        data={selectedDate}
        onRowClick={(tx: FormattedTransaction) => openDialog(tx)}
      />
      {isDialogOpen && selectedTransaction ? (
        <TransactionDialog
          transaction={selectedTransaction}
          onClose={() => setIsDialogOpen(false)}
        />
      ) : null}
    </div>
  );
}

const formatTransactions = (transactions: FormattedTransaction[]) => {
  const formatted = transactions.reduce((acc, curr) => {
    const exist = acc.findIndex(
      (e) => e.month == curr.createdAt.getMonth() + 1,
    );
    if (exist >= 0) {
      acc[exist].transactions.push(curr);
    } else {
      acc.push({
        month: curr.createdAt.getMonth() + 1,
        year: curr.createdAt.getFullYear(),
        transactions: [curr],
      });
    }
    return acc;
  }, [] as MonthYearTransaction[]);
  return formatted;
};
