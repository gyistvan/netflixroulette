export interface MovieCardProps {
  imgUrl: string;
  title: string;
  genres: string[];
  release_date: string;
  movieId: number;
  setIsEditModalOpen: (bool: boolean) => void;
  setIsDeleteModalOpen: (bool: boolean) => void;
  setSelectedMovie: (id: number) => void;
}
