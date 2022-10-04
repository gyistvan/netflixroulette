import { useState } from "react";
import { MovieCardProps } from "./movie-card-props";
import styles from "./movie-card.module.css";
import fallBackImg from "../../assets/img/fallback.png";
import { Button } from "antd";
import { useStore } from "../../store/store";

export default function MovieCard(props: MovieCardProps) {
  const [imageUrl, setImageUrl] = useState<string>(props.imgUrl);
  const [isContexMenuOpen, setIsContexMenuOpen] = useState(false);
  const [isContexMenuVisible, setIsContexMenuVisible] = useState(false);
  const store = useStore();
  const setFallbackImage = () => {
    setImageUrl(fallBackImg);
  };

  const dismissContexMenu = () => {
    setIsContexMenuVisible(false);
    setIsContexMenuOpen(false);
  };

  const formatGenres = (genres: string[]): string => {
    let genreStr = "";
    switch (genres.length) {
      case 1:
        genreStr = genres[0];
        break;
      case 2:
        genreStr = `${genres[0]} & ${genres[1]}`;
        break;
      default:
        genreStr = genres.join(", ");
        break;
    }

    return genreStr;
  };

  const getYear = (dateStr: string) => {
    return new Date(dateStr).getFullYear();
  };

  const openEditModal = () => {
    store.setSelectedMovieId(props.movieId);
    store.setIsEditModalOpen(true);
    dismissContexMenu();
  };

  const openDeleteModal = () => {
    store.setSelectedMovieId(props.movieId);
    store.setIsDeleteModalOpen(true);
    dismissContexMenu();
  };

  return (
    <div
      className={styles.movieCard}
      onMouseEnter={() => setIsContexMenuVisible(true)}
      onMouseLeave={() => dismissContexMenu()}
    >
      {isContexMenuVisible && (
        <div
          className={styles.contexMenuClosed}
          onClick={() => setIsContexMenuOpen(true)}
        >
          <span>⋮</span>
        </div>
      )}
      {isContexMenuOpen && (
        <div className={styles.contexMenu}>
          <div className={styles.contexMenuCloseBtn}>
            <Button type="text" onClick={() => setIsContexMenuOpen(false)}>
              <>X</>
            </Button>
          </div>
          <span onClick={openEditModal}>Edit</span>
          <span onClick={openDeleteModal}>Delete</span>
        </div>
      )}
      <img
        src={imageUrl}
        onError={() => setFallbackImage()}
        alt={props.title + "cover image"}
      />
      <div>
        <h2>{props.title}</h2>
        <span className={styles.releaseDate}>
          {getYear(props.release_date)}
        </span>
      </div>
      {formatGenres(props.genres)}
    </div>
  );
}
