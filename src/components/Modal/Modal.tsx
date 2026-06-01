import React, { useEffect, type ReactNode } from "react";

import css from "./Modal.module.css";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ children, onClose }: Props) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackDropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackDropClick}
      className={css.backdrop}
    >
      <div className={css.modal}>{children}</div>
    </div>
  );
};
