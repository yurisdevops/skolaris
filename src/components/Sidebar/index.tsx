import styles from "./styles.module.scss";
import { MdDashboard } from "react-icons/md";
import { MdClass } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";
import { clearUid } from "../../store/userSlice";
import { useDispatch } from "react-redux";

interface SidebarProps {
  open: boolean;
  theme?: string;
}

export function Sidebar({ open, theme }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  function navigation(link: string) {
    navigate(`${link}`);
  }
  return (
    <aside
      className={`${styles.sidebar} ${
        !open ? styles.sidebarClosed : styles.sidebarOpen
      } ${theme === "dark" ? styles.dark : styles.light}`}
    >
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li
            className={`${styles.navItem} ${
              location.pathname === "/dashboard" ? styles.active : ""
            }`}
            onClick={() => navigation("dashboard")}
          >
            <div className={styles.iconWrapper}>
              <MdDashboard className={styles.icon} />
            </div>
            {open && <span>Dashboard</span>}
          </li>

          <li
            className={`${styles.navItem} ${
              location.pathname === "/classes" ? styles.active : ""
            }`}
            onClick={() => navigation("classes")}
          >
            <div className={styles.iconWrapper}>
              <MdClass className={styles.icon} />
            </div>
            {open && <span>Classes</span>}
          </li>
        </ul>
      </nav>

      <div className={styles.profile}>
        <span onClick={() => navigate("/config/profile")}>Yuri</span>
        <button className={styles.logout} onClick={() => dispatch(clearUid())}>
          sair
        </button>
      </div>
    </aside>
  );
}
