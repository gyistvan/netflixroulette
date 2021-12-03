export interface ModalProps {
  children: JSX.Element;
  showResetBtn?: boolean;
  showCancelBtn?: boolean;
  setIsOpen: (bool: boolean) => void;
  reset?: () => void;
  cancel?: () => void;
  submit?: () => void;
  isSubmitDisabled?: boolean;
  title: string;
}
