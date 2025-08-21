"use client";

import { useState } from "react";
import { FormattedTransaction, MonthYearTransaction } from "../definitions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "./data-table";
import { columns } from "../columns";

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
      <Select
        defaultValue={`${dateFormatted[0].month}-${dateFormatted[0].year}`}
        onValueChange={(value) => {
          const [month, year] = value.split("-");
          setSelectedMonth(
            dateFormatted.find(
              (date) =>
                date.month === parseInt(month) && date.year === parseInt(year),
            )?.transactions || [],
          );
        }}
        required
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {dateFormatted.map((item) => (
            <SelectItem
              key={`${item.month}-${item.year}`}
              value={`${item.month}-${item.year}`}
            >
              {item.month} - {item.year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <DataTable columns={columns} data={selectedMonth} />
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
