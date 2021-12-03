import styles from "./page.module.css";

export default function Page(props: { children: JSX.Element }) {
  return <main className={styles.page}>{props.children}</main>;
}
