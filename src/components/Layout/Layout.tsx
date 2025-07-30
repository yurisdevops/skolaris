import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Container } from "./Container";
import { Header } from "./Header";
import styles from "./Layout.module.scss";
import { Sidebar } from "./Sidebar";

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

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

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
