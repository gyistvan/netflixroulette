import Button from "../button/button";
import styles from "./modal.module.css";
import { ModalProps } from "./modalProps";

export default function Modal(props: ModalProps) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div>
          <div
            className={styles.closeBtn}
            onClick={() => props.setIsOpen(false)}
          >
            X
          </div>
          <h3>{props.title}</h3>
          {props.children}
        </div>
        <div className={styles.modalButtons}>
          {props.reset && (
            <Button
              styles={{
                padding: "16px 57px",
                background: "transparent",
                border: "1px solid #F65261",
                color: "#F65261",
                fontSize: "20px",
                borderRadius: "5px",
                margin: "0 0 0 20px",
              }}
              onClick={props.reset}
            >
              <>RESET</>
            </Button>
          )}
          {props.cancel && (
            <Button
              styles={{
                padding: "16px 57px",
                background: "transparent",
                border: "1px solid #F65261",
                color: "#F65261",
                fontSize: "20px",
                borderRadius: "5px",
                margin: "0 0 0 20px",
              }}
              onClick={props.cancel}
            >
              <>CANCEL</>
            </Button>
          )}
          {props.submit && (
            <Button
              styles={{
                padding: "16px 57px",
                background: "#F65261",
                border: "1px solid #F65261",
                color: "#FFFFFF",
                fontSize: "20px",
                borderRadius: "5px",
                margin: "0 0 0 20px",
              }}
              isDisabled={props.isSubmitDisabled}
              onClick={props.submit}
            >
              <>SUBMIT</>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
