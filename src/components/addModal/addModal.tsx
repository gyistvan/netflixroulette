import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { GENRES } from "../../App";
import { Movie } from "../../interfaces/request/movie";
import Modal from "../modal/modal";
import styles from "./addModal.module.css";
import { AddModalProps } from "./addModalProps";

export default function AddModal(props: AddModalProps) {
  const movie = {
    genres: [],
    tagline: "Here's to the fools who dream.",
    vote_count: 6782,
    budget: 30000000,
    revenue: 445435700,
  };

  const [newMovie, setNewMovie] = useState<Movie>(movie);
  const [isGenreSelectMenuOpen, setIsGenreSelectMenuOpen] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const areGenresValid = useCallback(
    () => newMovie.genres.length > 0,
    [newMovie]
  );
  const isTitleValid = useCallback(
    () => newMovie.title && newMovie.title.length > 0,
    [newMovie]
  );
  const isRuntimeValid = useCallback(
    () => newMovie.runtime && newMovie.runtime > 0,
    [newMovie]
  );
  const isPosterPathValid = useCallback(
    () => newMovie.poster_path && newMovie.poster_path.length > 0,
    [newMovie]
  );
  const isOverviewValid = useCallback(
    () => newMovie.overview && newMovie.overview.length > 0,
    [newMovie]
  );
  const isRatingValid = useCallback(
    () => newMovie.vote_average && newMovie.vote_average > 0,
    [newMovie]
  );
  const isReleaseDateValid = useCallback(
    () => newMovie.release_date,
    [newMovie]
  );

  const switchGenreSelectMenuState = () => {
    setIsGenreSelectMenuOpen(!isGenreSelectMenuOpen);
  };

  const areInputsFilled = useCallback(() => {
    if (
      areGenresValid() &&
      isTitleValid() &&
      isRuntimeValid() &&
      isPosterPathValid() &&
      isOverviewValid() &&
      isRatingValid() &&
      isReleaseDateValid()
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [
    areGenresValid,
    isTitleValid,
    isRuntimeValid,
    isPosterPathValid,
    isOverviewValid,
    isRatingValid,
    isReleaseDateValid,
  ]);

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
    if (newMovie) {
      setNewMovie({ ...newMovie, [key]: value });
    }
  };

  const saveMovie = () => {
    axios.post("/movies", newMovie).then(() => {
      closeModal();
    });
  };

  const closeModal = () => {
    props.setIsOpen(false);
  };

  useEffect(() => {
    areInputsFilled();
  }, [newMovie, setNewMovie, areInputsFilled]);

  return (
    <Modal
      setIsOpen={props.setIsOpen}
      title="add movie"
      submit={saveMovie}
      cancel={closeModal}
      isSubmitDisabled={isSubmitDisabled}
    >
      <>
        {newMovie && (
          <form className={styles.editForm}>
            <div className={styles.formRow}>
              <fieldset>
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  name="title"
                  placeholder="Add title"
                  value={newMovie.title ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMovie("title", e.target.value)
                  }
                />
              </fieldset>
              <fieldset>
                <label htmlFor="releaseDate">Release date</label>
                <input
                  type="date"
                  placeholder="Select Date"
                  name="releaseDate"
                  id="releaseDate"
                  value={newMovie.release_date ?? ""}
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
                  placeholder="https://"
                  value={newMovie.poster_path ?? ""}
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
                  placeholder="7.8"
                  value={newMovie.vote_average ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMovie("vote_average", parseInt(e.target.value))
                  }
                />
              </fieldset>
            </div>
            <div className={styles.formRow}>
              <fieldset>
                <label htmlFor="genre">Genre</label>
                <div className={styles.genreInput}>
                  <p>
                    {newMovie.genres.length > 0 ? (
                      newMovie.genres.map((genre: string, index: number) => (
                        <React.Fragment key={genre}>
                          <span
                            onClick={() =>
                              setMovie(
                                "genres",
                                newMovie.genres.filter((g) => g !== genre)
                              )
                            }
                          >
                            X
                          </span>
                          <span>
                            {genre}
                            {index + 1 < newMovie.genres.length && ", "}
                          </span>
                        </React.Fragment>
                      ))
                    ) : (
                      <span className={styles.placeholder}>Select Genre</span>
                    )}
                  </p>
                  {isGenreSelectMenuOpen && (
                    <div className={styles.genreSelectMenu}>
                      {GENRES.filter(
                        (genre) =>
                          !newMovie.genres.includes(genre) && genre !== "All"
                      ).map((genre) => (
                        <div
                          key={genre}
                          onClick={() =>
                            setMovie("genres", [...newMovie.genres, genre])
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
                  placeholder="minutes"
                  value={
                    newMovie.runtime ? formatRunTime(newMovie.runtime) : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    returnNumberFromFormattedTime(e.target.value)
                  }
                />
              </fieldset>
            </div>
            <div className={styles.formRow}>
              <fieldset>
                <label htmlFor="overview">Overview</label>
                <textarea
                  value={newMovie.overview ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setMovie("overview", e.target.value)
                  }
                ></textarea>
              </fieldset>
            </div>
          </form>
        )}
      </>
    </Modal>
  );
}
