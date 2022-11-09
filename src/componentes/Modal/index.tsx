import { ReactNode } from "react";
import ModalComponente from "react-modal";
import { Container } from "./styles";

interface ModalProps {
  children: ReactNode;
  isVisible: boolean;
  onClickBlackPanel?: () => void;
}

const Modal = ({
  children,
  isVisible = true,
  onClickBlackPanel = () => {},
}: ModalProps) => {
  ModalComponente.setAppElement(".App");
  return (
    <ModalComponente
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "100%",
          height: 400,
          maxWidth: 300,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "auto",
          margin: "auto",
        },
      }}
      isOpen={isVisible}
      preventScroll
      onRequestClose={onClickBlackPanel}
      shouldCloseOnOverlayClick
    >
      <Container>{children}</Container>
    </ModalComponente>
  );
};

export default Modal;
