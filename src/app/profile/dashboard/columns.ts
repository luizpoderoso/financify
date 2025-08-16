import { ColumnDef } from "@tanstack/react-table";

type FormattedTransaction = {
  id: string;
  userId: string;
  date: string;
  description: string;
  amount: string;
  category: string;
};

export const columns: ColumnDef<FormattedTransaction>[] = [
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];
