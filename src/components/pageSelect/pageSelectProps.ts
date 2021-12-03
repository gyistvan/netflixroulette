export interface PageSelectProps {
  total: number;
  limit: number;
  setLimit: (limit: number) => void;
  offset: number;
  setOffset: (offset: number) => void;
}

export interface PageBoxProps {
  pageNum: number;
  displayedText: string;
  active?: boolean;
  setOffset: (offset: number) => void;
  isDisabled?: boolean;
}
