import { Link } from "react-router";
import styles from "./Header.module.scss";

export default function SubPageHeader({ title }: { title: string }) {
  return (
    <header className={styles.subHeader}>
      <Link to="/profile" className={styles.back}>
        ← Voltar ao Perfil
      </Link>
      <h2 className={styles.title}>{title}</h2>
    </header>
  );
}
