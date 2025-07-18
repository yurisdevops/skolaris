import styles from "./styles.module.scss";
import { Outlet } from "react-router";
import { Header } from "../Header";
import { Container } from "../Container";
import { useEffect, useState } from "react";
import { Sidebar } from "../Sidebar";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const stored = localStorage.getItem("sidebarOpen");
    return stored === "true";
  });

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("sidebarOpen", String(sidebarOpen));
  }, [sidebarOpen]);

  return (
    <>
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        theme={theme}
        setTheme={setTheme}
      />
      <div className={styles.layoutWrapper}>
        <Sidebar open={sidebarOpen} theme={theme} />
        <Container theme={theme} sidebarOpen={sidebarOpen}>
          <Outlet />
        </Container>
      </div>
    </>
  );
}
