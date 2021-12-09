export interface EditModalProps {
  setIsEditModalOpen: (bool: boolean) => void;
  getMovies: () => void;
  movieId?: number;
  isEditModalOpen: boolean;
}
