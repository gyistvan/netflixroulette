import { useCallback, useEffect, useState } from "react";
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

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSort, setActiveSort] = useState({
    title: "Release date",
    order: "asc",
    query: "release_date",
  });
  const [search, setSearch] = useState<string | undefined>();
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [total, setTotal] = useState<number | undefined>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | undefined>();

  const getSortString = useCallback(
    () => `sortBy=${activeSort.query}&sortOrder=${activeSort.order}`,
    [activeSort]
  );
  const getFilterString = useCallback(
    () => (activeFilter === "All" ? "" : `&filter=${activeFilter}`),
    [activeFilter]
  );
  const getSearchString = useCallback(
    () => (search ? `&search=${search}&searchBy=title` : ""),
    [search]
  );
  const getLimitAndOffsetString = useCallback(
    () => `&limit=${limit}&offset=${offset}`,
    [limit, offset]
  );

  const createUrl = useCallback(() => {
    return `/movies?${getSortString()}${getLimitAndOffsetString()}${getSearchString()}${getFilterString()}`;
  }, [
    getSortString,
    getSearchString,
    getFilterString,
    getLimitAndOffsetString,
  ]);

  const getMovies = useCallback(() => {
    axios.get(createUrl()).then((result) => {
      const data: MoviesResponse = result.data;
      const movies: Movie[] = data.data;
      setMovies(movies);
      setTotal(data.totalAmount);
    });
  }, [createUrl]);

  useEffect(() => {
    getMovies();
  }, [activeFilter, activeSort, search, getMovies]);

  const resetOffset = () => {
    setOffset(0);
  };

  useEffect(() => {
    resetOffset();
  }, [limit, activeFilter, search]);

  return (
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
      {total && (
        <div className={styles.pageAndTotal}>
          <p className={styles.totalMoviesCount}>
            <span>{total}&nbsp;</span>
            <span>movies found</span>
          </p>
          <Pagination
            showSizeChanger
            total={total}
            defaultCurrent={0}
            onShowSizeChange={setLimit}
            current={offset}
            onChange={setOffset}
          />
        </div>
      )}
      <div className={styles.movieCards}>
        {movies.map((movie: Movie) => (
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
        getMovies={getMovies}
      />
      <AddModal
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        getMovies={getMovies}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        movieId={selectedMovieId}
        getMovies={getMovies}
      />
    </>
  );
}
