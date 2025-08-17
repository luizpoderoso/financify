export type FormattedTransaction = {
  category: string;
  amount: number;
  type: "income" | "expense";
  createdAt: Date;
};
