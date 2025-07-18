import { TeacherForm } from "../../components/TeacherForm";
import styles from "./Teacher.module.scss";
export function Teachers() {
  return (
    <div className={styles.dashboard}>
      <h1>Professores</h1>
      <TeacherForm />
    </div>
  );
}
