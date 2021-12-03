import styles from "./button.module.css";
import { Link } from "react-router-dom";
import { ButtonProps } from "./buttonProps";
import React from "react";

export default function Button(props: ButtonProps) {
  const onClick = (e: React.MouseEvent) => {
    if (props.onClick) {
      props.onClick(e);
    }
  };
  return props.link ? (
    <Link to={props.link}>
      <button
        disabled={props.isDisabled}
        style={{ ...props.styles }}
        className={styles.button}
      >
        {props.children}
      </button>
    </Link>
  ) : (
    <button
      disabled={props.isDisabled}
      style={{ ...props.styles }}
      className={styles.button}
      onClick={(e: React.MouseEvent) => onClick(e)}
    >
      {props.children}
    </button>
  );
}
