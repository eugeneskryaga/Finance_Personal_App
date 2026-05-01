import type { ReactNode } from "react";
import css from "./Modal.module.css";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ children, onClose }: Props) => {
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        {children}
        <button
          onClick={onClose}
          className={css.close_btn}
        >
          Close
        </button>
      </div>
    </div>
  );
};
