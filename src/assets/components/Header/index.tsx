import styles from "./index.module.css";
import NavLinks from "../NavLinks";
import { memo } from "react";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#2563eb" />
              <path
                d="M16 8v16M8 16h16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className={styles.brandText}>
            <h1 className={styles.title}>FinanceTracker</h1>
            <span className={styles.subtitle}>Professional Edition</span>
          </div>
        </div>
        <NavLinks />

        <div className={styles.actions}>
          <div className={styles.profile}>
            <div className={styles.avatar}>
              <span>kL$</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
