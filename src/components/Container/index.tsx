import type { ReactNode } from "react";
import styles from "./styles.module.scss";

interface ContainerProps {
  children: ReactNode;
  theme?: "light" | "dark";
  sidebarOpen?: boolean;
}

export function Container({ children, theme, sidebarOpen }: ContainerProps) {
  return (
    <div
      className={`${styles.container} ${
        sidebarOpen ? "" : styles.sidebarClosedContainer
      } ${theme === "dark" ? styles.dark : styles.light}`}
    >
      {children}
    </div>
  );
}
