import { IMaskInput } from "react-imask";
import React from "react";
import styles from "./Form.module.scss";

interface MaskedInputProps {
  name: string;
  mask: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  onBlur?: () => void;
  error?: string;
}

export const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ name, mask, placeholder, value, onChange, onBlur, error }, ref) => (
    <div className={styles.inputWrapper}>
      <IMaskInput
        mask={mask}
        name={name}
        lazy={true}
        value={value}
        onAccept={(val) => onChange?.({ target: { name, value: val } })}
        onBlur={onBlur}
        placeholder={placeholder}
        inputRef={ref}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
);
