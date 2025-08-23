"use client";

import { useState } from "react";
import { FormattedTransaction, MonthYearTransaction } from "../../definitions";
import { DataTable } from "./data-table";
import { columns } from "../../columns";
import DateSelect from "./date-select";

export default function Table({
  transactions,
}: {
  transactions: FormattedTransaction[];
}) {
  const dateFormatted = formatTransactions(transactions);
  const [selectedMonth, setSelectedMonth] = useState<FormattedTransaction[]>(
    dateFormatted[0].transactions,
  );

  return (
    <div className="flex flex-col gap-5">
      <DateSelect
        setSelectedMonth={setSelectedMonth}
        dateFormatted={dateFormatted}
      />
      <DataTable
        columns={columns}
        data={selectedMonth}
        onRowClick={(row: FormattedTransaction) => console.log(row)}
      />
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
