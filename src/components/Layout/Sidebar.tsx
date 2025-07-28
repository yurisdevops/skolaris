import { FaUserTie } from "react-icons/fa";
import { HiLogout } from "react-icons/hi";
import {
  MdAssignment,
  MdAttachMoney,
  MdClass,
  MdDashboard,
  MdPeople,
  MdSchool,
  MdSettings,
  MdWork,
} from "react-icons/md";
import styles from "./Layout.module.scss";

import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import type { AppDispatch } from "../../store";
import { clearUid } from "../../store/userSlice";

interface SidebarProps {
  open: boolean;
  theme?: string;
}

export function Sidebar({ open, theme }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  function navigation(link: string) {
    navigate(`${link}`);
  }

  const dispatch = useDispatch<AppDispatch>();

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
        <Link to={"/profile"}>
          {" "}
          <img src="/images/escola.webp" alt="Profile" />
        </Link>

        {open && (
          <>
            <Link to={"/profile"}>Perfil</Link>
            <button
              className={styles.logout}
              onClick={() => dispatch(clearUid())}
            >
              <HiLogout size={32} />
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
