import axios from "axios";
import Modal from "../modal/modal";
import { DeleteModalProps } from "./deleteModalProps";
import styles from "./deleteModal.module.css";

export default function DeleteModal(props: DeleteModalProps) {
  const onDelete = () => {
    if (props.movieId) {
      axios.delete(`/moview/${props.movieId}`);
    }
  };
  return (
    <Modal title="Delete movie" submit={onDelete} setIsOpen={props.setIsOpen}>
      <>
        <p className={styles.areYouSureText}>
          Are you sure to delete this movie?
        </p>
      </>
    </Modal>
  );
}
