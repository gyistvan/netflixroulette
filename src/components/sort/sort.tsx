import { useState } from "react";
import { sortOptions, useStore } from "../../store/store";
import { SortOption } from "./sort-props";
import styles from "./sort.module.css";

export default function Sort() {
  const store = useStore();
  const [isSortTabOpen, setIsSortTabOpen] = useState(false);

  const filterOutActiveSort = (sortOption: SortOption) =>
    sortOption.title !== store.sortTitle ||
    sortOption.order !== store.sortOrder;

  return (
    <div className={styles.sort}>
      <span>Sort By:</span>
      <span className={styles.activeSort}>
        {store.sortTitle}
        &nbsp;
        {store.sortOrder === "asc" ? "↑" : "↓"}
        {isSortTabOpen && (
          <div className={styles.sortTab}>
            {sortOptions
              .filter(filterOutActiveSort)
              .map((sortOption: SortOption) => (
                <span
                  onClick={() => store.updateSort(sortOption)}
                  key={sortOption.title + sortOption.order}
                >
                  {sortOption.title}
                  &nbsp;
                  {sortOption.order === "asc" ? "↑" : "↓"}
                </span>
              ))}
          </div>
        )}
        <span
          className={styles.arrowDown}
          onClick={() => setIsSortTabOpen(!isSortTabOpen)}
        >
          ▼
        </span>
      </span>
    </div>
  );
}
