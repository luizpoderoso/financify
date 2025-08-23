export type FormattedTransaction = {
  id: string;
  category: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  createdAt: Date;
};

export type MonthYearTransaction = {
  month: number;
  year: number;
  transactions: FormattedTransaction[];
};
