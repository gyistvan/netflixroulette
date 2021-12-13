import { useEffect } from "react";
import Filter from "../../components/filter/filter";
import Sort from "../../components/sort/sort";
import { Movie } from "../../interfaces/response/movies-response";
import styles from "./home.module.css";
import Header from "../../components/header/header";
import MovieCard from "../../components/movie-card/movie-card";
import EditModal from "../../components/edit-modal/edit-modal";
import AddModal from "../../components/add-modal/add-modal";
import DeleteModal from "../../components/delete-modal/delete-modal";
import { Pagination } from "antd";
import { observer } from "mobx-react";
import { useStore } from "../../store/store";

const Home = observer(() => {
  const store = useStore();

  useEffect(() => {
    store.updateMovies();
  }, [store]);
  return (
    <>
      <Header />
      <div className={styles.filterAndSort}>
        <Filter />
        <Sort />
      </div>
      {store.total && (
        <div className={styles.pageAndTotal}>
          <p className={styles.totalMoviesCount}>
            <span>{store.total}&nbsp;</span>
            <span>movies found</span>
          </p>
          <Pagination
            showSizeChanger
            total={store.total}
            defaultCurrent={0}
            onShowSizeChange={store.updateLimit}
            current={store.offset}
            onChange={store.updateOffset}
          />
        </div>
      )}
      <div className={styles.movieCards}>
        {store.movies.map((movie: Movie) => (
          <MovieCard
            key={movie.id}
            imgUrl={movie.poster_path}
            title={movie.title}
            genres={movie.genres}
            release_date={movie.release_date}
            movieId={movie.id}
          />
        ))}
      </div>
      <EditModal />
      <AddModal />
      <DeleteModal />
    </>
  );
});

export default Home;
