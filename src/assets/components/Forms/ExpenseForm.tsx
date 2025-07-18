import styles from "./index.module.css";
import { useExpenseStore } from "../../store/expenseStore";
import { memo, useCallback, useMemo, useState } from "react";
import ExpenseModal from "../Modals/ExpenseModal";
import { handleExpenseSubmit } from "../../services/ExpenseFormSubmit";

export function ExpenseForm() {
  const [isOpen, setIsOpen] = useState(false);

  const { categories, addExpense } = useExpenseStore();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(NaN);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [method, setMethod] = useState("");
  const [errors, setErrors] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
    method: "",
  });

  const resetFields = () => {
  setDescription("");
  setAmount(NaN);
  setCategory("");
  setDate("");
  setMethod("");
  setErrors({
    description: "",
    amount: "",
    category: "",
    date: "",
    method: "",
  });
};

const handleSubmit = useCallback(
  (e: React.FormEvent) => {
    e.preventDefault();
    handleExpenseSubmit({
      data: { description, amount, category, date, method },
      setErrors,
      addExpense,
      resetFields,
    });
  },
  [description, amount, category, date, method, addExpense]
);


const categoryOptions = useMemo(
  () =>
    categories.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    )),
  [categories]
);


  return (
    <div className={styles.formCard}>
      <div className={styles.header}>
        <h2 className={styles.title}>Добавить расходы</h2>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Описание</label>
            <input
              type="text"
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Введите описание расхода"
            />
            {errors.description && (
              <span className={styles.errorText}>{errors.description}</span>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Сумма</label>
            <div className={styles.amountInput}>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className={styles.input}
                placeholder="0.00"
                step="0.01"
              />
              <br></br>
              {errors.amount && (
                <span className={styles.errorText}>{errors.amount}</span>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Категория</label>
            <div className={styles.selectWrapper}>
              <select
                className={styles.select}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoryOptions}
              </select>
            </div>
            {errors.category && (
              <span className={styles.errorText}>{errors.category}</span>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Дата</label>
            <input
              type="date"
              className={styles.input}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {errors.date && (
              <span className={styles.errorText}>{errors.date}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Способ оплаты</label>
            <select
              className={styles.select}
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="">Выберите способ</option>
              <option value="Наличные">Наличные</option>
              <option value="Карта">Банковская карта</option>
              <option value="Перевод">Перевод</option>
            </select>
            {errors.method && (
              <span className={styles.errorText}>{errors.method}</span>
            )}
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            Добавить расход
          </button>
          <button
            type="button"
            className={styles.addCategoryButton}
            onClick={() => setIsOpen(true)}
          >
            Редактировать категории
          </button>
        </div>
      </form>
      <ExpenseModal
        description="Здесь вы можете редактировать категории расходов"
        onClose={() => setIsOpen(false)}
        title={""}
        isOpen={isOpen}
      ></ExpenseModal>
    </div>
  );
}

export default memo(ExpenseForm);
