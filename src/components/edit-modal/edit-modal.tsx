import { Input, Modal, Select, DatePicker, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GENRES } from "../../App";
import { Movie } from "../../interfaces/response/movies-response";
import styles from "./edit-modal.module.css";
import { EditModalProps } from "./edit-modal-props";

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

  useEffect(() => {
    if (props.movieId) {
      axios.get(`/movies/${props.movieId}`).then((res) => {
        const data: Movie = res.data;
        setSelectedMovie(data);
      });
    }
  }, [props.movieId]);

  const editMovie = () => {
    axios.put("/movies", { ...selectedMovie }).then(() => {
      props.setIsEditModalOpen(false);
      props.getMovies();
    });
  };

  return (
    <Modal
      className="basicModal"
      width="70%"
      title="Edit movie"
      visible={props.isEditModalOpen}
      onCancel={() => props.setIsEditModalOpen(false)}
      onOk={editMovie}
      okText={"Save movie"}
      cancelButtonProps={{ type: "ghost" }}
    >
      <>
        {selectedMovie && (
          <form className={styles.editForm}>
            <div className={styles.formRow}>
              <fieldset>
                <label htmlFor="title">Title</label>
                <Input
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
                <Input
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
                <Input
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
                <Input
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
                <Select
                  mode="multiple"
                  showArrow
                  size="large"
                  placeholder="genres"
                  defaultValue={selectedMovie.genres}
                  options={GENRES
                      .map((genre) => ({value: genre}))}
              />
              </fieldset>
              <fieldset>
                <label htmlFor="runTime">Runtime</label>
                <Input
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
