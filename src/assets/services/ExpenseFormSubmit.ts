// services/handleForms.ts
import type { ExpenseData, ExpenseErrors } from "../types/formTypes";

interface HandleExpenseSubmitProps {
  data: ExpenseData;
  setErrors: React.Dispatch<React.SetStateAction<ExpenseErrors>>;
  addExpense: (data: ExpenseData) => void;
  resetFields: () => void;
}

export const handleExpenseSubmit = ({
  data,
  setErrors,
  addExpense,
  resetFields,
}: HandleExpenseSubmitProps) => {
  const { description, amount, category, date, method } = data;

  const newErrors: ExpenseErrors = {
    description: description.trim() === "" ? "Описание обязательно" : "",
    amount: amount <= 0 ? "Сумма должна быть больше нуля" : "",
    category: category.trim() === "" ? "Категория обязательна" : "",
    date: date.trim() === "" ? "Дата обязательна" : "",
    method: method.trim() === "" ? "Выберите метод оплаты" : "",
  };

  setErrors(newErrors);

  const hasErrors = Object.values(newErrors).some((error) => error !== "");
  if (hasErrors) return;

  addExpense(data);
  resetFields();
};
