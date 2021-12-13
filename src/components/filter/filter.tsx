import styles from "./filter.module.css";
import { useStore } from "../../store/store";

export default function Filter() {
  const store = useStore();
  return (
    <div className={styles.filter}>
      {store.genres.map((genre: string) => (
        <span
          onClick={() => store.updateFilter(genre)}
          className={
            store.filter === genre || (!store.filter && genre === "All")
              ? styles.active
              : ""
          }
          key={genre}
        >
          {genre}
        </span>
      ))}
    </div>
  );
}
