import { Link } from "react-router-dom";
import styles from "./logo.module.css";

export default function Logo() {
  return (
    <Link to="/">
      <h1 className={styles.logo}>
        <span className={styles.bold}>netflix</span>
        <span className={styles.thin}>roulette</span>
      </h1>
    </Link>
  );
}
