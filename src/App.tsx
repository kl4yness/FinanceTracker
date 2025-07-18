import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ExpensesPage from "./assets/pages/Expenses";
import IncomesPage from "./assets/pages/Income";

import styles from "./app.module.css";
import Header from "./assets/components/Header";

export default function App() {
  return (
    <Router>
      <div className={styles.page}>
        <div className={styles.container}>
          <Header />
          <div className={styles.section}>
            <Routes>
              <Route path="/expenses" element={<ExpensesPage />} />
              <Route path="/income" element={<IncomesPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
