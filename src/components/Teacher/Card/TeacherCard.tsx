import styles from "./TeacherCard.module.scss";

type Teacher = {
  id: string;
  nome: string;
  disciplinas: string[];
  email: string;
  status: string;
};

interface TeacherCardProps {
  teacher: Teacher;
  onClick: () => void;
}
export function TeacherCard({ teacher, onClick }: TeacherCardProps) {
  return (
    <div className={styles.card} onClick={onClick}>
      <h3>{teacher.nome}</h3>
      <p>
        <strong>Disciplinas:{" "}</strong>
        {Array.isArray(teacher.disciplinas)
          ? teacher.disciplinas.join(", ")
          : "Não informado"}
      </p>
      <p>
        <strong>Email:{" "}</strong>
        {teacher.email}
      </p>
    </div>
  );
}
