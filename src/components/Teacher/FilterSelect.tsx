import styles from "./TeacherControls.module.scss";
const subjects = [
  "Matemática",
  "Português",
  "Física",
  "História",
  "Geografia",
  "Química",
  "Biologia",
  "Educação Física",
  "Artes",
  "Inglês",
  "Espanhol",
  "Informática",
  "Filosofia",
  "Sociologia",
  "Educação Religiosa",
  "Língua Estrangeira",
  "Outros",
];

export function FilterSelect({
  onSelect,
}: {
  onSelect: (value: string) => void;
}) {
  return (
    <select
      className={styles.select}
      defaultValue=""
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="">Todas as disciplinas</option>
      {subjects.map((subject) => (
        <option key={subject} value={subject}>
          {subject}
        </option>
      ))}
    </select>
  );
}
