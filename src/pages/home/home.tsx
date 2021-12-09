import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import Filter from "../../components/filter/filter";
import Sort from "../../components/sort/sort";
import {
  Movie,
  MoviesResponse,
} from "../../interfaces/response/movies-response";
import styles from "./home.module.css";
import Header from "../../components/header/header";
import MovieCard from "../../components/movie-card/movie-card";
import EditModal from "../../components/edit-modal/edit-modal";
import AddModal from "../../components/add-modal/add-modal";
import DeleteModal from "../../components/delete-modal/delete-modal";
import { Pagination } from "antd";
import { StoreContext } from "../..";
import { useObserver } from "mobx-react-lite";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSort, setActiveSort] = useState({
    title: "Release date",
    order: "asc",
    query: "release_date",
  });
  const [search, setSearch] = useState<string | undefined>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | undefined>();

  const store = useContext(StoreContext);

  useEffect(() => {
    store.updateMovies();
  }, []);

  return useObserver(() => (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        setIsAddModalOpen={setIsAddModalOpen}
      />
      <div className={styles.filterAndSort}>
        <Filter setActiveFilter={setActiveFilter} activeFilter={activeFilter} />
        <Sort activeSort={activeSort} setActiveSort={setActiveSort} />
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
            current={store.urlParams.offset}
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
            setIsEditModalOpen={setIsEditModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            setSelectedMovie={setSelectedMovieId}
          />
        ))}
      </div>
      <EditModal
        movieId={selectedMovieId}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />
      <AddModal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        movieId={selectedMovieId}
      />
    </>
  ));
}
