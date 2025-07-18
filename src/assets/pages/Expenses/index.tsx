import ExpenseCards from "../../components/Cards/ExpenseCards";
import ExpenseDashboard from "../../components/Dashboard/ExpenseDashboard";
import styles from "./index.module.css";
import ExpenseForm from "../../components/Forms/ExpenseForm";
export default function ExpensesPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.section}>
          <ExpenseCards />
        </div>

        <div className={styles.content}>
          <div className={styles.formSection}>
            <ExpenseForm />
          </div>

          <div className={styles.listSection}>
            <ExpenseDashboard />
          </div>
        </div>
      </div>
    </main>
  );
}
