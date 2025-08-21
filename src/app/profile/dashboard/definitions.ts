export type FormattedTransaction = {
  category: string;
  amount: number;
  type: "income" | "expense";
  createdAt: Date;
};

export type MonthYearTransaction = {
  month: number;
  year: number;
  transactions: FormattedTransaction[];
};
