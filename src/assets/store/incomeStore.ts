import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Income } from "../types/income";

interface IncomeStore {
  incomes: Income[];
  categories: string[];
  addIncome: (income: Income) => void;
  removeIncome: (index: number) => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
}
export const useIncomeStore = create(
  persist<IncomeStore>(
    (set) => ({
      incomes: [],
      categories: ["Выберите категорию"],

      addIncome: (income) =>
        set((state) => ({
          incomes: [...state.incomes, income],
        })),

      removeIncome: (index) =>
        set((state) => ({
          incomes: state.incomes.filter((_, i) => i !== index),
        })),

      addCategory: (category: string) =>
        set((state) => ({
          categories: [...state.categories, category],
        })),

      removeCategory: (category: string) =>
        set((state) => ({
          categories: state.categories.filter((c) => c !== category),
        })),
    }),
    {
      name: "income-storage",
    }
  )
);
