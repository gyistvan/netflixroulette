import { GENRES } from "../../App";
import styles from "./filter.module.css";
import { FilterProps } from "./filter-props";

export default function Filter(props: FilterProps) {
  return (
    <div className={styles.filter}>
      {GENRES.map((genre: string) => (
        <span
          onClick={() => props.setActiveFilter(genre)}
          className={props.activeFilter === genre ? styles.active : ""}
          key={genre}
        >
          {genre}
        </span>
      ))}
    </div>
  );
}
