import { useEffect, type ReactNode } from "react";
import css from "./Modal.module.css";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ children, onClose }: Props) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
    >
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
