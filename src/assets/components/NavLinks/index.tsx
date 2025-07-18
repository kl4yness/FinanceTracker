import { memo } from "react";
import styles from "./index.module.css";
import { Link, useLocation } from "react-router-dom";

function navLinks() {
  const location = useLocation();

  return (
    <nav className={styles.navigation}>
      <Link
        to="/expenses"
        className={`${styles.navButton} ${
          location.pathname === "/expenses" ? styles.active : ""
        }`}
      >
        Расходы
      </Link>
      <Link
        to="/income"
        className={`${styles.navButton} ${
          location.pathname === "/income" ? styles.active : ""
        }` }
      >
        Доходы
      </Link>
    </nav>
  );
}

export default memo(navLinks);
