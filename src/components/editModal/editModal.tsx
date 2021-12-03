import axios from "axios";
import React, { useEffect, useState } from "react";
import { GENRES } from "../../App";
import { Movie } from "../../interfaces/response/moviesResponse";
import Modal from "../modal/modal";
import styles from "./editModal.module.css";
import { EditModalProps } from "./editModalProps";

export default function EditModal(props: EditModalProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>();
  const [isGenreSelectMenuOpen, setIsGenreSelectMenuOpen] = useState(false);

  const formatRunTime = (runTime: number) => {
    return `${runTime} min`;
  };

  const returnNumberFromFormattedTime = (formattedRunTime: string) => {
    const t = parseInt(formattedRunTime.replace(/\D/g, ""));
    if (isNaN(t)) {
      return;
    }
    setMovie("runtime", t);
  };

  const setMovie = (key: keyof Movie, value: string | string[] | number) => {
    if (selectedMovie) {
      setSelectedMovie({ ...selectedMovie, [key]: value });
    }
  };

  const saveMovie = () => {
    axios.put("/movies", selectedMovie).then(() => {
      closeModal();
    });
  };

  const closeModal = () => {
    props.setIsOpen(false);
  };

  useEffect(() => {
    if (props.movieId) {
      axios.get(`/movies/${props.movieId}`).then((res) => {
        const data: Movie = res.data;
        setSelectedMovie(data);
      });
    }
  }, []);

  return (
    <Modal
      setIsOpen={props.setIsOpen}
      title="edit movie"
      submit={saveMovie}
      cancel={closeModal}
    >
      <>
        {selectedMovie && (
          <form className={styles.editForm}>
            <div className={styles.formRow}>
              <fieldset>
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  name="title"
                  value={selectedMovie.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMovie("title", e.target.value)
                  }
                />
              </fieldset>
              <fieldset>
                <label htmlFor="releaseDate">Release date</label>
                <input
                  type="date"
                  name="releaseDate"
                  id="releaseDate"
                  value={selectedMovie.release_date}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMovie("release_date", e.target.value)
                  }
                />
              </fieldset>
            </div>
            <div className={styles.formRow}>
              <fieldset>
                <label htmlFor="movieUrl">Movie url</label>
                <input
                  id="movieUrl"
                  name="movieUrl"
                  value={selectedMovie.poster_path}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMovie("poster_path", e.target.value)
                  }
                />
              </fieldset>
              <fieldset>
                <label htmlFor="rating">Rating</label>
                <input
                  type="text"
                  name="rating"
                  id="rating"
                  value={selectedMovie.vote_average}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMovie("vote_average", e.target.value)
                  }
                />
              </fieldset>
            </div>
            <div className={styles.formRow}>
              <fieldset>
                <label htmlFor="genre">Genre</label>
                <div className={styles.genreInput}>
                  <p>
                    {selectedMovie.genres.map(
                      (genre: string, index: number) => (
                        <React.Fragment key={genre}>
                          <span
                            onClick={() =>
                              setMovie(
                                "genres",
                                selectedMovie.genres.filter((g) => g !== genre)
                              )
                            }
                          >
                            X
                          </span>
                          <span>
                            {genre}
                            {index + 1 < selectedMovie.genres.length && ", "}
                          </span>
                        </React.Fragment>
                      )
                    )}
                  </p>
                  {isGenreSelectMenuOpen && (
                    <div className={styles.genreSelectMenu}>
                      {GENRES.filter(
                        (genre) =>
                          !selectedMovie.genres.includes(genre) &&
                          genre !== "All"
                      ).map((genre) => (
                        <div
                          key={genre}
                          onClick={() =>
                            setMovie("genres", [...selectedMovie.genres, genre])
                          }
                        >
                          {genre}
                        </div>
                      ))}
                    </div>
                  )}
                  <span
                    className={styles.arrowDown}
                    onClick={() =>
                      setIsGenreSelectMenuOpen(!isGenreSelectMenuOpen)
                    }
                  >
                    ▼
                  </span>
                </div>
              </fieldset>
              <fieldset>
                <label htmlFor="runTime">Runtime</label>
                <input
                  type="text"
                  name="runTime"
                  id="runTime"
                  value={formatRunTime(selectedMovie.runtime)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    returnNumberFromFormattedTime(e.target.value)
                  }
                />
              </fieldset>
            </div>
          </form>
        )}
      </>
    </Modal>
  );
}
