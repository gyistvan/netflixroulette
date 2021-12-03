export interface DeleteModalProps {
  movieId?: number;
  setIsOpen: (bool: boolean) => void;
  getMovies: () => void;
}
