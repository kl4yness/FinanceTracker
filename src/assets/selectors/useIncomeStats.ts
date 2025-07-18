import { useIncomeStore } from "../store/incomeStore";
import { useExpenseStore } from "../store/expenseStore"; 
import { useMemo } from "react";

export const useIncomeStats = () => {
  const incomes = useIncomeStore((state) => state.incomes);
  const expenses = useExpenseStore((state) => state.expenses);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthlyIncomes = useMemo(() => {
    return incomes.filter((income) => {
      const incomeDate = new Date(income.date);
      return (
        incomeDate.getMonth() === currentMonth &&
        incomeDate.getFullYear() === currentYear
      );
    });
  }, [incomes, currentMonth, currentYear]);

  const totalMonthlyIncomes = useMemo(
    () =>
      monthlyIncomes
        .reduce((total, income) => total + income.amount, 0)
        .toLocaleString("ru-RU"),
    [monthlyIncomes]
  );

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const remainingDays = daysInMonth - currentDate.getDate();

  const totalIncomes = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const total = totalIncomes - totalExpenses;
  const countIncomes = incomes.length;
  const average = (countIncomes > 0 ? total / countIncomes : 0).toLocaleString("ru-RU");

  const usedPercentage =
    totalIncomes > 0 ? (totalExpenses / totalIncomes) * 100 : 0;

  return {
    totalMonthlyIncomes,
    remainingDays,
    totalIncomes,
    totalExpenses,
    total,
    countIncomes,
    average,
    usedPercentage,
  };
};
