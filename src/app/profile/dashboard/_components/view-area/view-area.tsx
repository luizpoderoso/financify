"use client";

import { useEffect, useMemo, useState } from "react";
import { FormattedTransaction, MonthYearTransaction } from "../definitions";
import DateSelect from "./date-select";
import Table from "./table/table";
import { deleteTransactionAction } from "@/lib/actions/transaction";
import SummaryCards from "./summary-cards";

interface ViewAreaProps {
  data: FormattedTransaction[];
}

export default function ViewArea({ data }: ViewAreaProps) {
  const groupedByDate = useMemo(() => groupByDate(data), [data]);

  const [selectedDateTx, setSelectedDateTx] = useState<FormattedTransaction[]>(
    groupedByDate[0].transactions,
  );

  useEffect(() => {
    if (groupByDate.length > 0) {
      setSelectedDateTx(groupedByDate[0].transactions);
    } else {
      setSelectedDateTx([]);
    }
  }, [groupedByDate]);

  return (
    <>
      <DateSelect
        dateFormatted={groupedByDate}
        setSelectedDate={setSelectedDateTx}
      />
      <SummaryCards transactions={selectedDateTx} />
      <Table
        transactions={selectedDateTx}
        deleteAction={deleteTransactionAction}
      />
    </>
  );
}

const groupByDate = (transactions: FormattedTransaction[]) => {
  const groupedByDate = transactions.reduce((acc, curr) => {
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
  return groupedByDate;
};
