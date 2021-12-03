import React, { useState } from "react";
import Button from "../button/button";
import styles from "./search.module.css";
import { SearchProps } from "./searchProps";

export default function Search(props: SearchProps) {
  const [searchStr, setSearchStr] = useState("");

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStr(e.target.value);
  };

  const onSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.setSearch(searchStr);
  };

  return (
    <>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="What do you want to watch?"
          value={searchStr}
          onChange={onValueChange}
          className={styles.input}
        />
        <Button
          styles={{
            color: "#FFFFFF",
            background: "#F65261",
            fontFamily: "Montserrat",
            fontWeight: 500,
            fontSize: "20px",
            padding: "18px 73px",
          }}
          onClick={onSearch}
        >
          <>Search</>
        </Button>
      </form>
    </>
  );
}
