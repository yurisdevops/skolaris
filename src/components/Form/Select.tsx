import { Controller } from "react-hook-form";
import Select from "react-select";
import styles from "./Form.module.scss";

interface SelectProps {
  name: string;
  options: string[];
  control: any; // vem do useForm
  error?: string;
  multiple?: boolean;
  placeholder?: string;
}

export function CustomSelect({
  name,
  options,
  control,
  error,
  multiple = false,
  placeholder,
}: SelectProps) {
  const formattedOptions = options.map((opt) => ({
    value: opt,
    label: opt,
  }));

  return (
    <div className={styles.inputWrapper}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={formattedOptions}
            isMulti={multiple}
            placeholder={placeholder || "Selecione uma opção"}
            className={error ? styles.inputSelect : ""}
            classNamePrefix="react-select"
            onChange={(selected) => {
              if (multiple) {
                field.onChange((selected as any[])?.map((s) => s.value) || []);
              } else {
                field.onChange((selected as any)?.value || "");
              }
            }}
            value={
              multiple
                ? formattedOptions.filter((opt) =>
                    (field.value || []).includes(opt.value)
                  )
                : formattedOptions.find((opt) => opt.value === field.value) ||
                  null
            }
            styles={{
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused
                  ? "#f0f0f0" // fundo quando passa o mouse
                  : "#fff", // fundo normal
                color: "#000", // cor do texto da opção
                cursor: "pointer",
              }),
              control: (base) => ({
                ...base,
                backgroundColor: "#fff", // fundo branco
                color: "#000", // texto preto
                borderColor: error ? "#e53935" : "#ccc",
                "&:hover": {
                  borderColor: "#4a90e2",
                },
              }),
              input: (base) => ({
                ...base,
                color: "#000", // texto digitado preto
              }),
              singleValue: (base) => ({
                ...base,
                color: "#000", // valor selecionado preto
              }),
              placeholder: (base) => ({
                ...base,
                color: "#555", // placeholder cinza mais forte, legível
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: "#eee",
                color: "#000",
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: "#000",
              }),
            }}
          />
        )}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
