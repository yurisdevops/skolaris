import styles from "./Header.module.scss";
import { RiMenuUnfold3Fill } from "react-icons/ri";
import { RiMenuUnfold4Fill } from "react-icons/ri";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import logo from "../../assets/logo/logo.png";
import { useNavigate } from "react-router";

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
          <img src={logo} alt="" onClick={() => navigate("/dashboard")} />
        </div>
        <div className={styles.themeToggle}>
          {theme === "light" ? (
            <FaMoon
              size={26}
              color="#264a64"
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
