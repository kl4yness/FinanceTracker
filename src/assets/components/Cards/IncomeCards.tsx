import styles from "./index.module.css";
import type { StatsCardProps } from "../../types/cards";
import { useIncomeStats } from "../../selectors/useIncomeStats";

export function StatsCard({
  title,
  value,
  change,
  changeType,
  icon,
}: StatsCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}>{icon}</div>{" "}
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardValue}>{value}</p>
        </div>
      </div>
      <div className={styles.cardFooter}>
        <span className={`${styles.change} ${styles[changeType]}`}>
          {change}
        </span>
      </div>
    </div>
  );
}

export default function IncomeCards() {

  const {
    totalMonthlyIncomes,
    remainingDays,
    totalIncomes,
    total,
    average,
    usedPercentage,
  } = useIncomeStats();

  return (
    <div className={styles.grid}>
      <StatsCard
        title="Общий доход"
        value={`₽ ${totalIncomes.toLocaleString("en-US")}`}
        change={`Потрачено ${usedPercentage.toFixed(2)}%`}
        changeType={usedPercentage > 100 ? "negative" : "neutral"}
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />

      <StatsCard
        title="Текущий месяц"
        value={`₽ ${totalMonthlyIncomes.toLocaleString("en-US")}`}
        change={`Осталось ${remainingDays} дней`}
        changeType="neutral"
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="4"
              width="18"
              height="18"
              rx="2"
              ry="2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="16"
              y1="2"
              x2="16"
              y2="6"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="8"
              y1="2"
              x2="8"
              y2="6"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="3"
              y1="10"
              x2="21"
              y2="10"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        }
      />

      <StatsCard
        title="Средний доход"
        value={`₽ ${average.toLocaleString("en-US")}`}
        change="Средняя сумма поступлений"
        changeType="positive"
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" />
            <path
              d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        }
      />

      <StatsCard
        title="Бюджет"
        value={`₽ ${total.toLocaleString("en-US")}`}
        change="То, что можно потратить"
        changeType="neutral"
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" />
          </svg>
        }
      />
    </div>
  );
}
