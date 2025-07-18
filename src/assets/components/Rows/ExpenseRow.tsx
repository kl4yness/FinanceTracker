import type { Expense } from "../../types/expense";
import { useExpenseStore } from "../../store/expenseStore";
import styles from "./index.module.css";

interface ExpenseRowProps {
  expense: Expense;
  index: number;
}

export default function ExpenseRow({ expense, index }: ExpenseRowProps) {
  
  const { removeExpense } = useExpenseStore();

  const handleDelete = () => {
    removeExpense(index);
  };

  return (
    <div className={styles.Row}>
      <div className={styles.Main}>
        <div className={styles.Info}>
          <h4 className={styles.Description}>{expense.description}</h4>
          <div className={styles.Meta}>
            <span className={styles.Category}>{expense.category}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.Date}>{expense.date.toString()}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.paymentMethod}>{expense.method}</span>
          </div>
        </div>
        <div className={styles.Amount}>
          -₽ {expense.amount.toLocaleString("en-US")}
        </div>
      </div>
      <div className={styles.Actions}>
        <button className={styles.actionButton} onClick={handleDelete}>
          🗑️
        </button>
      </div>
    </div>
  );
}
