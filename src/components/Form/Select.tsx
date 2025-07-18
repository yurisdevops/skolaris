import styles from "./Form.module.scss";

interface SelectProps {
  name: string;
  options: string[];
  register: any;
  error?: string;
  multiple?: boolean;
}

export function Select({
  name,
  options,
  register,
  error,
  multiple = false,
}: SelectProps) {
  return (
    <div className={styles.inputWrapper}>
      <select
        {...register(name)}
        multiple={multiple}
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
