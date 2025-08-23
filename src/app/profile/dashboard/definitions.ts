export type FormattedTransaction = {
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
