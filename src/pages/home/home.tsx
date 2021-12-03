import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Filter from "../../components/filter/filter";
import Sort from "../../components/sort/sort";
import {
  Movie,
  MoviesResponse,
} from "../../interfaces/response/moviesResponse";
import styles from "./home.module.css";
import Header from "../../components/header/header";
import MovieCard from "../../components/movieCard/movieCard";
import EditModal from "../../components/editModal/editModal";
import AddModal from "../../components/addModal/addModal";
import DeleteModal from "../../components/deleteModal/deleteModal";
import PageSelect from "../../components/pageSelect/pageSelect";

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
          <PageSelect
            total={total}
            limit={limit}
            setLimit={setLimit}
            offset={offset}
            setOffset={setOffset}
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
      {isEditModalOpen && (
        <EditModal
          setIsOpen={setIsEditModalOpen}
          movieId={selectedMovieId}
          getMovies={getMovies}
        />
      )}
      {isAddModalOpen && (
        <AddModal setIsOpen={setIsAddModalOpen} getMovies={getMovies} />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsOpen={setIsDeleteModalOpen}
          movieId={selectedMovieId}
          getMovies={getMovies}
        />
      )}
    </>
  );
}
