import { useIncomeStore } from "../store/incomeStore";
import { useExpenseStore } from "../store/expenseStore"; // если расходы в отдельном zustand
import { useMemo } from "react";

export const useExpenseStats = () => {
  const incomes = useIncomeStore((state) => state.incomes);
  const expenses = useExpenseStore((state) => state.expenses);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthlyExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    });
  }, [expenses, currentMonth, currentYear]);

  const totalMonthlyExpenses = useMemo(
    () =>
      monthlyExpenses
        .reduce((total, expense) => total + expense.amount, 0)
        .toLocaleString("ru-RU"),
    [monthlyExpenses]
  );

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const remainingDays = daysInMonth - currentDate.getDate();

  const totalIncomes = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const total = totalExpenses;
  const budget = totalIncomes - totalExpenses;

  const countExpenses = expenses.length;
  const average = (
    countExpenses > 0 ? total / countExpenses : 0
  ).toLocaleString("ru-RU");

  return {
    totalMonthlyExpenses,
    remainingDays,
    totalIncomes,
    totalExpenses,
    total,
    budget,
    countExpenses,
    average,
  };
};
