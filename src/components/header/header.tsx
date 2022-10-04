import { Button } from "antd";
import Logo from "../logo/logo";
import Search from "../search/search";
import styles from "./header.module.css";
import { useStore } from "../../store/store";

export default function Header() {
  const store = useStore();
  return (
    <header className={styles.header}>
      <div>
        <Logo />
        <div className={styles.addBtnWrapper}>
          <Button type="ghost" onClick={() => store.setIsAddModalOpen(true)}>
            + ADD MOVIE
          </Button>
        </div>
      </div>
      <div>
        <h1>FIND YOUR MOVIE</h1>
        <Search />
      </div>
    </header>
  );
}
