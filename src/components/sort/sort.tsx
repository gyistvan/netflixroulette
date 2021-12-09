import { useState } from "react";
import { SortOption, SortProps } from "./sort-props";
import styles from "./sort.module.css";

export default function Sort(props: SortProps) {
  const [isSortTabOpen, setIsSortTabOpen] = useState(false);

  const sortOptions: SortOption[] = [
    { title: "Release date", order: "asc", query: "release_date" },
    { title: "Release date", order: "desc", query: "release_date" },
    { title: "Title", order: "asc", query: "title" },
    { title: "Title", order: "desc", query: "title" },
    { title: "Rating", order: "asc", query: "vote_average" },
    { title: "Rating", order: "desc", query: "vote_average" },
  ];

  const filterOutActiveSort = (sortOption: SortOption) =>
    sortOption.title !== props.activeSort.title ||
    sortOption.order !== props.activeSort.order;

  return (
    <div className={styles.sort}>
      <span>Sort By:</span>
      <span className={styles.activeSort}>
        {props.activeSort.title}
        &nbsp;
        {props.activeSort.order === "asc" ? "↑" : "↓"}
        {isSortTabOpen && (
          <div className={styles.sortTab}>
            {sortOptions
              .filter(filterOutActiveSort)
              .map((sortOption: SortOption) => (
                <span
                  onClick={() => props.setActiveSort(sortOption)}
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
