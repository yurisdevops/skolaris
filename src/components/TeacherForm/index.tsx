import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { teacherSchema, type TeacherData } from "../../schemas/teacherSchema";
import { doc, setDoc } from "firebase/firestore";
import db from "../../services/firestore/firestore";
import toast from "react-hot-toast";
import { useAuthState } from "../../hooks/useAuthState";
import axios from "axios";
import { Input } from "../Form/Input";
import styles from "./TeacherForm.module.scss";
import { useNavigate } from "react-router";
import { MaskedInput } from "../Form/MaskInput";
import { Select } from "../Form/Select";
import { useCepAutoFill } from "../../hooks/useCepAutoFill";

export function TeacherForm() {
  const navigate = useNavigate();
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

      <form className={styles.form} onSubmit={handleSubmit(registerTeacher)}>
        <section className={styles.formContainer}>
          <aside className={styles.formContent}>
            <h3 className={styles.title}>Teacher Registration</h3>

            <Input
              type="text"
              name="fullName"
              register={register}
              placeholder="Full name"
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
                  placeholder="Phone"
                  error={errors.phone?.message}
                />
              )}
            />

            <Select
              name="subjects"
              multiple
              options={["Math", "Portuguese", "Physics", "History"]}
              register={register}
              error={errors.subjects?.message}
            />

            <Select
              name="role"
              options={["Professor", "Coordinator", "Other"]}
              register={register}
              error={errors.role?.message}
            />

            <Controller
              name="zipCode"
              control={control}
              render={({ field }) => (
                <MaskedInput
                  {...field}
                  mask="00000-000"
                  placeholder="ZIP Code"
                  error={errors.zipCode?.message}
                />
              )}
            />

            <Input
              type="text"
              name="address"
              register={register}
              placeholder="Address"
              error={errors.address?.message}
            />

            <Input
              type="text"
              name="city"
              register={register}
              placeholder="City"
              error={errors.city?.message}
            />

            <Input
              type="text"
              name="state"
              register={register}
              placeholder="State"
              error={errors.state?.message}
            />
          </aside>

          <aside className={styles.formContent}>
            <h3 className={styles.subtitle}>Authentication</h3>

            <Input
              type="password"
              name="password"
              register={register}
              placeholder="Password"
              error={errors.password?.message}
            />

            <Input
              type="password"
              name="confirmPassword"
              register={register}
              placeholder="Confirm password"
              error={errors.confirmPassword?.message}
            />
          </aside>
        </section>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register Teacher"}
        </button>
      </form>
    </>
  );
}
