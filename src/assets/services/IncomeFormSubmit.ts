
import type { Dispatch, SetStateAction } from "react";

interface Errors {
  description: string;
  amount: string;
  category: string;
  date: string;
}

export const IncomeFormSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  description: string,
  setDescription: React.Dispatch<React.SetStateAction<string>>,
  amount: number,
  setAmount: React.Dispatch<React.SetStateAction<number>>,
  category: string,
  setCategory: React.Dispatch<React.SetStateAction<string>>,
  date: string,
  setDate: React.Dispatch<React.SetStateAction<string>>,
  setErrors: Dispatch<SetStateAction<Errors>>,  // Обновил тип
  addIncome: (income: { description: string; amount: number; category: string; date: string }) => void
) => {
  e.preventDefault();

  const newErrors: Errors = {  // Указал тип ошибок
    description: description.trim() === "" ? "Описание обязательно" : "",
    amount: amount <= 0 ? "Сумма должна быть больше нуля" : "",
    category: category.trim() === "" ? "Категория обязательна" : "",
    date: date.trim() === "" ? "Дата обязательна" : "",
  };

  setErrors(newErrors);

  const hasErrors = Object.values(newErrors).some((error) => error !== "");
  if (hasErrors) return;

  addIncome({
    description,
    amount,
    category,
    date,
  });

  setDescription("");
  setAmount(NaN);
  setCategory("");
  setDate("");
  setErrors({
    description: "",
    amount: "",
    category: "",
    date: "",
  });
};
