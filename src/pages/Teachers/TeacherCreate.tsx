import { Link } from "react-router";
import { TeacherForm } from "../../components/Teacher/Form/TeacherForm";
import styles from "./Teacher.module.scss";
export function TeacherCreate() {
  return (
    <main className={styles.teacherCreate}>
      <section className={styles.header}>
        <Link to="/teachers" className={styles.createButton}>
          ← Voltar ao Painel
        </Link>
      </section>
      <TeacherForm />
    </main>
  );
}
