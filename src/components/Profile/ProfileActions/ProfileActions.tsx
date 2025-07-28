import { Link } from "react-router";
import styles from "./ProfileActions.module.scss";

export default function ProfileActions() {
  return (
    <div className={styles.actionsContainer}>
      <Link to="/profile/edit" className={styles.actionButton}>
        Editar Perfil
      </Link>
      <Link to="/users/manage" className={styles.actionButton}>
        Gerenciar Usuários
      </Link>
    </div>
  );
}
