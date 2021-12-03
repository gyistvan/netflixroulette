export interface EditModalProps {
  setIsOpen: (bool: boolean) => void;
  movieId?: number;
  getMovies: () => void;
}
