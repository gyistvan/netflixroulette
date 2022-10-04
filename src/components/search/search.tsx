import React, { useState } from "react";
import { Button } from "antd";
import styles from "./search.module.css";
import { useStore } from "../../store/store";

export default function Search() {
  const [searchStr, setSearchStr] = useState("");
  const store = useStore();

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStr(e.target.value);
  };

  const onSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    store.updateSearch(searchStr);
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
        <Button type="primary" onClick={onSearch}>
          <>Search</>
        </Button>
      </form>
    </>
  );
}
