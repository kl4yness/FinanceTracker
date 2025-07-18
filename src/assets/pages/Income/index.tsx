import styles from "./index.module.css";
import IncomeCards from "../../components/Cards/IncomeCards";
import IncomeForm from "../../components/Forms/IncomeForm";
import IncomeDashboard from "../../components/Dashboard/IncomeDashboard";
export default function IncomesPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.grid}>
            <IncomeCards />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.formSection}>
            <IncomeForm />
          </div>

          <div className={styles.listSection}>
            <IncomeDashboard />
          </div>
        </div>
      </div>
    </main>
  );
}
