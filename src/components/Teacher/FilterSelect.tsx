import styles from "./TeacherControls.module.scss";

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
      <option value="Math">Matemática</option>
      <option value="Portuguese">Português</option>
      <option value="History">História</option>
      <option value="Physics">Física</option>
    </select>
  );
}
