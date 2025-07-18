import { useExpenseStore } from "../../store/expenseStore";
import styles from "./index.module.css";
import ExpenseRow from "../Rows/ExpenseRow";
import { useMemo, useCallback, useState } from "react";

export default function ExpenseDashboard() {
  const [category, setCategory] = useState("Выберите категорию");
  const [timePeriod, setTimePeriod] = useState("");

  const { categories, expenses } = useExpenseStore();

  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      setCategory(e.target.value),
    []
  );

  const handleTimePeriodChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      setTimePeriod(e.target.value),
    []
  );

  const categoryOptions = useMemo(
    () => [
      ...categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      )),
    ],
    [categories]
  );

  const filteredExpenses = useMemo(() => {
    const byCategory =
      category === "Выберите категорию"
        ? expenses
        : expenses.filter((expense) => expense.category === category);

    if (timePeriod === "") return byCategory;

    const currentDate = new Date();
    const filterDate = new Date();

    switch (timePeriod) {
      case "7":
        filterDate.setDate(currentDate.getDate() - 7);
        break;
      case "30":
        filterDate.setDate(currentDate.getDate() - 30);
        break;
      case "90":
        filterDate.setDate(currentDate.getDate() - 90);
        break;
      default:
        break;
    }

    return byCategory.filter(
      (item) => new Date(item.date) >= filterDate
    );
  }, [expenses, timePeriod, category]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Последние расходы</h2>
        <div className={styles.filters}>
          <select
            className={styles.filterSelect}
            onChange={handleCategoryChange}
            value={category}
          >
            {categoryOptions}
          </select>

          <select
            className={styles.filterSelect}
            value={timePeriod}
            onChange={handleTimePeriodChange}
          >
            <option value="">За все время</option>
            <option value="7">За 7 дней</option>
            <option value="30">За 30 дней</option>
            <option value="90">За 3 месяца</option>
          </select>
        </div>
      </div>

      <div className={styles.List}>
        {filteredExpenses.length === 0 ? (
          <p>Расходов пока что нет</p>
        ) : (
          filteredExpenses.map((expense, index) => (
            <ExpenseRow key={index} expense={expense} index={index} />
          ))
        )}
      </div>
    </div>
  );
}
