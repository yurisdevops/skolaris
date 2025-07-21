import styles from "./TeacherCard.module.scss";

interface TeacherCardProps {
  teacher: any;
  onClick: () => void;
}
export function TeacherCard({ teacher, onClick }: TeacherCardProps) {
  return (
    <div className={styles.card} onClick={onClick}>
      <h3>{teacher.nome}</h3>
      <p>
        <strong>Disciplinas:</strong>
        {teacher.disciplinas.join(", ")}
      </p>
      <p>
        <strong>Email:</strong>
        {teacher.email}
      </p>
    </div>
  );
}
