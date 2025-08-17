"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FormattedTransaction } from "./definitions";

export const columns: ColumnDef<FormattedTransaction>[] = [
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const type = row.getValue("type") as "income" | "expense";

      return (
        <div className={type === "income" ? "text-green-300" : "text-red-400"}>
          {amount.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    // Opcional: Podemos capitalizar a primeira letra para ficar mais bonito
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return type.charAt(0).toUpperCase() + type.slice(1);
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return formattedDate;
    },
  },
];
