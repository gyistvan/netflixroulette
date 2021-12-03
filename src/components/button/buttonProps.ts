import { CSSProperties } from "react";

export interface ButtonProps {
  link?: string;
  children?: JSX.Element;
  onClick?: Function;
  styles: ButtonStyles;
  isDisabled?: boolean;
}

export interface ButtonStyles {
  background?: string;
  border?: string;
  color?: string;
  fontFamily?: string;
  fontWeight?: number;
  fontSize?: string;
  padding?: string;
  borderRadius?: string;
  margin?: string;
}
