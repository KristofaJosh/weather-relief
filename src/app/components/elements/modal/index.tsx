import React, {CSSProperties, FC} from "react";
import ReactDOM from "react-dom";
import style from "./modal.module.scss";

const Portal: FC = ({ children }) =>
  ReactDOM.createPortal(
    children,
    document.getElementById("root-modal") as Element
  );

const Modal: FC<{
  visible: boolean;
  closeModal: () => void;
  maxWidth?: number;
  style?: CSSProperties
}> = ({ visible, closeModal, children, style: cssStyle, maxWidth }) => (
  <Portal>
    {visible && (
      <div className={style.modal}>
        <div style={{ maxWidth, ...cssStyle }} className={style.modalContent}>
          <div className={style.modalContent__close} >
            <p onClick={closeModal}>X</p>
          </div>
          {children}
        </div>
      </div>
    )}
  </Portal>
);

export default Modal;
