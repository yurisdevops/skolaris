import styles from "./Form.module.scss";

interface InputProps {
  type?: string;
  name: string;
  placeholder?: string;
  register: any;
  error?: string;
}

export function Input({
  type = "text",
  name,
  placeholder,
  register,
  error,
}: InputProps) {
  return (
    <div className={styles.inputWrapper}>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
