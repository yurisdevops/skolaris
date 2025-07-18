import styles from "./Form.module.scss";

interface SelectProps {
  name: string;
  options: string[];
  register: any;
  error?: string;
}

export function Select({ name, options, register, error }: SelectProps) {
  return (
    <div className={styles.inputWrapper}>
      <select
        {...register(name)}
        className={`${styles.select} ${error ? styles.inputError : ""}`}
      >
        <option value="">Selecione...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
