import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CustomSelect } from "../../../components/Form/Select";
import { useAuthState } from "../../../hooks/useAuthState";
import { useCepAutoFill } from "../../../hooks/useCepAutoFill";
import {
  teacherSchema,
  type TeacherData,
} from "../../../schemas/teacherSchema";
import db from "../../../services/firestore/firestore";
import { Input } from "../../Form/Input";
import { MaskedInput } from "../../Form/MaskInput";
import styles from "./TeacherForm.module.scss";

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

const roles = ["Professor", "Coordenador", "Outro"];

export function TeacherForm() {
  const { uid } = useAuthState();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TeacherData>({
    resolver: zodResolver(teacherSchema),
  });

  useCepAutoFill(watch, setValue, {
    zipCode: "zipCode",
    address: "address",
    city: "city",
    state: "state",
  });

  async function registerTeacher(data: TeacherData) {
    try {
      if (!uid) {
        toast.error("UID da escola não encontrado.");
        return;
      }

      const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          email: data.email,
          password: data.password,
          returnSecureToken: false,
        }
      );

      const uidTeacher = response.data.localId;

      await setDoc(doc(db, "escolas", uid, "professores", uidTeacher), {
        ...data,
        uidTeacher,
        tipoUsuario: "professor",
        dataCadastro: new Date(),
      });

      toast.success("Professor cadastrado com sucesso!");
      reset();
    } catch (error: any) {
      const message =
        error.response?.data?.error?.message || "Erro ao cadastrar professor";
      toast.error(message);
      console.error("Erro:", message);
    }
  }

  return (
    <>
      <header className={styles.title}>
        <h3>Cadastro de Professor</h3>
        <div className={styles.divisor}></div>
      </header>

      <form
        role="form"
        aria-label="Cadastro de Professor"
        className={styles.form}
        onSubmit={handleSubmit(registerTeacher)}
      >
        <section className={styles.formContainer}>
          <aside className={styles.formContent}>
            <h3 className={styles.title}>Dados Pessoais</h3>

            <Input
              type="text"
              name="fullName"
              register={register}
              placeholder="Nome completo"
              error={errors.fullName?.message}
            />

            <Input
              type="email"
              name="email"
              register={register}
              placeholder="Email"
              error={errors.email?.message}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <MaskedInput
                  {...field}
                  mask="(00) 0 0000-0000"
                  placeholder="Telefone"
                  error={errors.phone?.message}
                />
              )}
            />

            <CustomSelect
              name="subjects"
              multiple
              options={subjects}
              placeholder="Selecione as disciplinas"
              control={control}
              error={errors.subjects?.message}
            />

            <CustomSelect
              placeholder="Selecione Cargo"
              name="role"
              options={roles}
              control={control}
              error={errors.role?.message}
            />

            <Controller
              name="zipCode"
              control={control}
              render={({ field }) => (
                <MaskedInput
                  {...field}
                  mask="00000-000"
                  placeholder="CEP"
                  error={errors.zipCode?.message}
                />
              )}
            />

            <Input
              type="text"
              name="address"
              register={register}
              placeholder="Endereço"
              error={errors.address?.message}
            />

            <Input
              type="text"
              name="city"
              register={register}
              placeholder="Cidade"
              error={errors.city?.message}
            />

            <Input
              type="text"
              name="state"
              register={register}
              placeholder="Estado"
              error={errors.state?.message}
            />
          </aside>

          <aside className={styles.formContent}>
            <h3 className={styles.subtitle}>Autentificação</h3>

            <Input
              type="password"
              name="password"
              register={register}
              placeholder="Senha"
              error={errors.password?.message}
            />

            <Input
              type="password"
              name="confirmPassword"
              register={register}
              placeholder="Confirmar senha"
              error={errors.confirmPassword?.message}
            />
          </aside>
        </section>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Cadastrando..." : "Cadastrar Professor"}
        </button>
      </form>
    </>
  );
}
