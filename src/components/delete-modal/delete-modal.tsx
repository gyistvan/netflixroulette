import axios from "axios";
import { DeleteModalProps } from "./delete-modal-props";
import styles from "./delete-modal.module.css";
import { Modal } from "antd";

export default function DeleteModal(props: DeleteModalProps) {
  const onDelete = () => {
    if (props.movieId) {
      axios.delete(`/movies/${props.movieId}`).then(() => {
        props.setIsOpen(false);
        props.getMovies();
      });
    }
  };

  return (
    <Modal
      className="basicModal"
      title="Delete movie"
      visible={props.isOpen}
      onOk={onDelete}
      onCancel={() => props.setIsOpen(false)}
    >
      <p className={styles.areYouSureText}>
        Are you sure to delete this movie?
      </p>
    </Modal>
  );
}
