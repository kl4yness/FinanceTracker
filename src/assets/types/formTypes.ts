export type ExpenseData = {
  description: string;
  amount: number;
  category: string;
  date: string;
  method: string;
};

export type ExpenseErrors = {
  [K in keyof ExpenseData]: string;
};
