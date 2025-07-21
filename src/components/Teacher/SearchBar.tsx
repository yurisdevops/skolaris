import styles from "./TeacherControls.module.scss";

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  return (
    <input
      type="text"
      className={styles.input}
      placeholder="Buscar por nome ou discipline..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
