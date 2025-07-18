import type { Income } from "../../types/income";
import { useIncomeStore } from "../../store/incomeStore";
import styles from "./index.module.css";

interface IncomeRowProps {
  income: Income;
  index: number;
}

export default function IncomeRow({ income, index }: IncomeRowProps) {
  
  const { removeIncome } = useIncomeStore();

  const handleDelete = () => {
    removeIncome(index);
  };

  return (
    <div className={styles.Row}>
      <div className={styles.Main}>
        <div className={styles.Info}>
          <h4 className={styles.Description}>{income.description}</h4>
          <div className={styles.Meta}>
            <span className={styles.Category}>{income.category}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.Date}>{income.date.toString()}</span>
          </div>
        </div>
        <div className={`${styles.Amount} ${styles.incomeAmount}`}>
          +₽ {income.amount.toLocaleString("en-US")}
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
