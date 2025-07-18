import styles from "./index.module.css";
import { useIncomeStore } from "../../store/incomeStore";
import { memo, useCallback, useMemo, useState } from "react";
import IncomeModal from "../Modals/IncomeModal";
import { IncomeFormSubmit } from "../../services/IncomeFormSubmit";

export interface Errors {
  description: string;
  amount: string;
  category: string;
  date: string;
}

export function IncomeForm() {
  const [isOpen, setIsOpen] = useState(false);

  const { addIncome, categories } = useIncomeStore();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(NaN);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState<Errors>({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      )),
    [categories]
  );

  const handleSubmit = useCallback(
  (e: React.FormEvent<HTMLFormElement>) => {
    IncomeFormSubmit(
      e,
      description,
      setDescription,
      amount,
      setAmount,
      category,
      setCategory,
      date,
      setDate,
      setErrors,
      addIncome
    );
  },
  [description, amount, category, date, addIncome]
);


  return (
    <div className={styles.formCard}>
      <div className={styles.header}>
        <h2 className={styles.title}>Добавить доходы</h2>
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Описание</label>
            <input
              type="text"
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Введите описание дохода"
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
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            Добавить доход
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
      <IncomeModal
        description="Здесь вы можете редактировать категории расходов"
        onClose={() => setIsOpen(false)}
        title={""}
        isOpen={isOpen}
      ></IncomeModal>
    </div>
  );
}
export default memo(IncomeForm);
