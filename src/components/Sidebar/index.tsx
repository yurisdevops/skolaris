import styles from "./Sidebar.module.scss";
import {
  MdDashboard,
  MdClass,
  MdSchool,
  MdPeople,
  MdWork,
  MdAssignment,
  MdAttachMoney,
  MdSettings,
} from "react-icons/md";
import { FaUserTie } from "react-icons/fa";

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
            {open && <span>Turmas</span>}
          </li>

          <li
            className={`${styles.navItem} ${
              location.pathname === "/teachers" ? styles.active : ""
            }`}
            onClick={() => navigation("teachers")}
          >
            <div className={styles.iconWrapper}>
              <FaUserTie className={styles.icon} />
            </div>
            {open && <span>Professores</span>}
          </li>

          <li
            className={`${styles.navItem} ${
              location.pathname === "/students" ? styles.active : ""
            }`}
            onClick={() => navigation("students")}
          >
            <div className={styles.iconWrapper}>
              <MdSchool className={styles.icon} />
            </div>
            {open && <span>Alunos</span>}
          </li>

          <li
            className={`${styles.navItem} ${
              location.pathname === "/guardians" ? styles.active : ""
            }`}
            onClick={() => navigation("guardians")}
          >
            <div className={styles.iconWrapper}>
              <MdPeople className={styles.icon} />
            </div>
            {open && <span>Responsáveis</span>}
          </li>

          <li
            className={`${styles.navItem} ${
              location.pathname === "/grades" ? styles.active : ""
            }`}
            onClick={() => navigation("grades")}
          >
            <div className={styles.iconWrapper}>
              <MdAssignment className={styles.icon} />
            </div>
            {open && <span>Notas</span>}
          </li>

          <li
            className={`${styles.navItem} ${
              location.pathname === "/finance" ? styles.active : ""
            }`}
            onClick={() => navigation("finance")}
          >
            <div className={styles.iconWrapper}>
              <MdAttachMoney className={styles.icon} />
            </div>
            {open && <span>Financeiro</span>}
          </li>
          <li
            className={`${styles.navItem} ${
              location.pathname === "/staff" ? styles.active : ""
            }`}
            onClick={() => navigation("staff")}
          >
            <div className={styles.iconWrapper}>
              <MdWork className={styles.icon} />
            </div>
            {open && <span>Funcianários</span>}
          </li>

          <li
            className={`${styles.navItem} ${
              location.pathname === "/settings" ? styles.active : ""
            }`}
            onClick={() => navigation("settings")}
          >
            <div className={styles.iconWrapper}>
              <MdSettings className={styles.icon} />
            </div>
            {open && <span>Configurações</span>}
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
