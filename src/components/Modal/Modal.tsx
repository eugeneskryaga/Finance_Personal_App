import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Modal = ({ children }: Props) => {
  return (
    <div>
      <div>
        {children}
        <button>Close</button>
      </div>
    </div>
  );
};
