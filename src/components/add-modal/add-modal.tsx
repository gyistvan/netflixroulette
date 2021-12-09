import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { GENRES } from "../../App";
import { Movie } from "../../interfaces/request/movie";
import styles from "./add-modal.module.css";
import { AddModalProps } from "./add-modal-props";
import { Input, Modal, Select, DatePicker, Space } from "antd";
import moment from "moment";
import { StoreContext } from "../..";

export default function AddModal(props: AddModalProps) {
  const { TextArea } = Input;
  const movie = {
    genres: [],
    tagline: "Here's to the fools who dream.",
    vote_count: 6782,
    budget: 30000000,
    revenue: 445435700,
  };

  const store = useContext(StoreContext);

  const [newMovie, setNewMovie] = useState<Movie>(movie);
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

  const resetMovieState = () => setNewMovie({ ...movie });

  const saveMovie = () => {
    axios.post("/movies", newMovie).then(() => {
      closeModal();
      store.updateMovies();
      resetMovieState();
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
      title="Add movie"
      visible={props.isOpen}
      className="basicModal"
      width="70%"
      onCancel={closeModal}
      onOk={saveMovie}
      okButtonProps={{ disabled: isSubmitDisabled }}
      cancelButtonProps={{ type: "ghost" }}
    >
      {newMovie && (
        <form className={styles.editForm}>
          <div className={styles.formRow}>
            <fieldset>
              <label htmlFor="title">Title</label>
              <Input
                placeholder="Add title"
                name="title"
                id="title"
                value={newMovie.title ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMovie("title", e.target.value)
                }
              />
            </fieldset>
            <fieldset>
              <label htmlFor="releaseDate">Release date</label>
              <Space direction="vertical">
                <DatePicker
                  name="releaseDate"
                  id="releaseDate"
                  value={
                    newMovie.release_date
                      ? moment(newMovie.release_date)
                      : undefined
                  }
                  onChange={(e) =>
                    setMovie("release_date", e?.toISOString() ?? "")
                  }
                />
              </Space>
            </fieldset>
          </div>
          <div className={styles.formRow}>
            <fieldset>
              <label htmlFor="movieUrl">Movie url</label>
              <Input
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
              <Input
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
              <Select
                mode="multiple"
                showArrow
                size="large"
                placeholder="genres"
                defaultValue={[]}
                options={GENRES.map((genre) => ({ value: genre }))}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="runTime">Runtime</label>
              <Input
                type="text"
                name="runTime"
                id="runTime"
                placeholder="minutes"
                value={newMovie.runtime ? formatRunTime(newMovie.runtime) : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  returnNumberFromFormattedTime(e.target.value)
                }
              />
            </fieldset>
          </div>
          <div className={styles.formRow}>
            <fieldset>
              <label htmlFor="overview">Overview</label>
              <TextArea
                rows={4}
                value={newMovie.overview ?? ""}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setMovie("overview", e.target.value)
                }
              />
            </fieldset>
          </div>
        </form>
      )}
    </Modal>
  );
}
