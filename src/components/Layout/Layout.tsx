import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import type { RootState } from "../../store";
import { setTheme } from "../../store/themeSlice";
import { Container } from "./Container";
import { Header } from "./Header";
import styles from "./Layout.module.scss";
import { Sidebar } from "./Sidebar";

export function Layout() {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const stored = localStorage.getItem("sidebarOpen");
    return stored === "true";
  });

  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    localStorage.setItem("sidebarOpen", String(sidebarOpen));
  }, [sidebarOpen]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeChange = (newTheme: "light" | "dark") => {
    dispatch(setTheme(newTheme));
  };

  return (
    <>
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        theme={theme}
        setTheme={handleThemeChange}
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
