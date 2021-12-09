import { Button } from "antd";
import Logo from "../logo/logo";
import Search from "../search/search";
import styles from "./header.module.css";
import { HeaderProps } from "./header-props";

export default function Header(props: HeaderProps) {
  return (
    <header className={styles.header}>
      <div>
        <Logo />
        <div className={styles.addBtnWrapper}>
          <Button type="ghost" onClick={() => props.setIsAddModalOpen(true)}>
            + ADD MOVIE
          </Button>
        </div>
      </div>
      <div>
        <h1>FIND YOUR MOVIE</h1>
        <Search search={props.search} setSearch={props.setSearch} />
      </div>
    </header>
  );
}
