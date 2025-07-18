import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Expense } from "../types/expense";

interface ExpenseStore {
  expenses: Expense[];
  categories: string[];
  addExpense: (expense: Expense) => void;
  removeExpense: (index: number) => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
}

export const useExpenseStore = create(
  persist<ExpenseStore>(
    (set) => ({

      expenses: [],
      categories: ["Выберите категорию"],

      addExpense: (expense) =>
        set((state) => ({
          expenses: [...state.expenses, expense],
        })),

      removeExpense: (index) =>
        set((state) => ({
          expenses: state.expenses.filter((_, i) => i !== index),
        })),

      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, category],
        })),

      removeCategory: (category: string) =>
        set((state) => ({
          categories: state.categories.filter((c) => c !== category),
        })),

    }),

    {
      name: "expense-storage",
    }

  )
);
