import { FaMoon, FaSun } from "react-icons/fa";
import { RiMenuUnfold3Fill, RiMenuUnfold4Fill } from "react-icons/ri";
import { useNavigate } from "react-router";
import styles from "./Layout.module.scss";

interface HeaderProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
  theme?: "light" | "dark";
  setTheme?: (theme: "light" | "dark") => void;
}

export function Header({
  sidebarOpen,
  setSidebarOpen,
  theme,
  setTheme,
}: HeaderProps) {
  const navigate = useNavigate();
  return (
    <>
      <header
        className={`${styles.header} ${
          theme === "dark" ? styles.dark : styles.light
        }`}
      >
        <div className={styles.logo}>
          {sidebarOpen ? (
            <RiMenuUnfold4Fill
              size={30}
              onClick={() => setSidebarOpen?.(false)}
            />
          ) : (
            <>
              <RiMenuUnfold3Fill
                size={30}
                onClick={() => setSidebarOpen?.(true)}
              />
            </>
          )}
          <img
            src="/images/logo.webp"
            alt="Logo Skolaris"
            onClick={() => navigate("/dashboard")}
          />
        </div>
        <div className={styles.themeToggle}>
          {theme === "light" ? (
            <FaMoon
              size={26}
              color="#030303ff"
              onClick={() => setTheme?.("dark")}
            />
          ) : (
            <FaSun
              size={26}
              color="#fff8f7"
              onClick={() => setTheme?.("light")}
            />
          )}
        </div>
      </header>
    </>
  );
}
