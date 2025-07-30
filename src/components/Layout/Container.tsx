import type { ReactNode } from "react";
import styles from "./Layout.module.scss";

interface ContainerProps {
  children: ReactNode;
  theme?: "light" | "dark";
  sidebarOpen?: boolean;
}

export function Container({ children, sidebarOpen }: ContainerProps) {
  return (
    <div
      className={`${styles.container} ${
        sidebarOpen ? "" : styles.sidebarClosedContainer
      } `}
    >
      {children}
    </div>
  );
}
