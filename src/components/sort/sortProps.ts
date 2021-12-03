export interface SortProps {
  setActiveSort: (sort: SortOption) => void;
  activeSort: SortOption;
}

export interface SortOption {
  title: string;
  order: string;
  query: string;
}
