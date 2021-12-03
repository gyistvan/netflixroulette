import Button from "../button/button";
import Logo from "../logo/logo";
import Search from "../search/search";
import styles from "./header.module.css";
import { HeaderProps } from "./headerProps";

export default function Header(props: HeaderProps) {
  return (
    <header className={styles.header}>
      <div>
        <Logo />
        <div className={styles.addBtnWrapper}>
          <Button
            onClick={() => props.setIsAddModalOpen(true)}
            styles={{
              background: "#60606068",
              border: "none",
              color: "#F65261",
              fontFamily: "Montserrat",
              fontWeight: 300,
              fontSize: "20px",
              padding: "11px 18px",
            }}
          >
            <>+ ADD MOVIE</>
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
