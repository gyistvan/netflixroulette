import axios from "axios";
import styles from "./delete-modal.module.css";
import { Modal } from "antd";
import { useStore } from "../../store/store";
import { observer } from "mobx-react-lite";

const DeleteModal = observer(() => {
  const store = useStore();
  const onDelete = () => {
    if (store.selectedMovieId) {
      axios.delete(`/movies/${store.selectedMovieId}`).then(() => {
        store.setIsDeleteModalOpen(false);
        store.updateMovies();
      });
    }
  };

  return (
    <Modal
      className="basicModal"
      title="Delete movie"
      visible={store.isDeleteModalOpen}
      onOk={onDelete}
      onCancel={() => store.setIsDeleteModalOpen(false)}
    >
      <p className={styles.areYouSureText}>
        Are you sure to delete this movie?
      </p>
    </Modal>
  );
});

export default DeleteModal;
