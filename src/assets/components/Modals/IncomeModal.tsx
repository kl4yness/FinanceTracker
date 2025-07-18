import { useState } from "react";
import styles from "./index.module.css";
import { useIncomeStore } from "../../store/incomeStore";
import type { ModalProps } from "../../types/modal";

export default function IncomeModal({ description, isOpen, onClose }: ModalProps) {
  const [activeTab, setActiveTab] = useState<"add" | "remove">("add");
  const [category, setCategory] = useState("");

  const { addCategory, categories, removeCategory } = useIncomeStore();

  if (!isOpen) return null;

  const handleAdd = () => {
    if (!category.trim()) return;
    addCategory(category);
    setCategory("");
    onClose();
  };

  const handleRemove = (category: string) => {
    removeCategory(category);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Управление категориями</h2>
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>
        </div>
        <div className={styles.tabs}>
          <button
            onClick={() => setActiveTab("add")}
            className={`${styles.tabButton} ${
              activeTab === "add" ? styles.active : ""
            }`}
          >
            Добавить
          </button>
          <button
            onClick={() => setActiveTab("remove")}
            className={`${styles.tabButton} ${
              activeTab === "remove" ? styles.active : ""
            }`}
          >
            Удалить
          </button>
        </div>

        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.content}>
          {activeTab === "add" && (
            <>
              <input
                type="text"
                placeholder="Введите категорию"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.input}
              />
              <button className={styles.submitButton} onClick={handleAdd}>
                Добавить категорию
              </button>
            </>
          )}

          {activeTab === "remove" && (
            <ul className={styles.categoryList}>
              {categories.length > 0 ? (
                categories
                  .filter((category) => category !== "Выберите категорию")
                  .map((category) => (
                    <li key={category} className={styles.categoryItem}>
                      <span>{category}</span>
                      <button
                        onClick={() => handleRemove(category)}
                        className={styles.deleteButton}
                      >
                        🗑️
                      </button>
                    </li>
                  ))
              ) : (
                <span>Категорий пока что нет</span>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
