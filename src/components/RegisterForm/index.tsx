import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Input } from "../Form/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterData,
} from "../../schemas/registerSchema";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../services/auth/auth";
import { ZodError } from "zod";
import toast from "react-hot-toast";

interface RegisterFormProps {
  setView: (access: "login" | "register") => void;
}
export function RegisterForm({ setView }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  async function onSubmit(data: RegisterData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      reset();

      toast.success("Usuário criado");
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de validação", error.issues);
      } else {
        console.error("Erro ao criar a conta do usuário:", error);
      }
    }
  }
  return (
    <>
      <header className={styles.title}>
        <h3>Cadastro</h3>
        <div className={styles.divisor}></div>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label htmlFor="user">Email</label>
        <Input
          name="email"
          type="email"
          placeholder="example@example.com"
          register={register}
          error={errors.email?.message}
        />
        <label htmlFor="">Senha</label>
        <Input
          name="password"
          type="password"
          placeholder="********"
          register={register}
          error={errors.password?.message}
        />
        <label htmlFor="">Confirme Sua Senha</label>
        <Input
          name="confirm"
          type="password"
          placeholder="********"
          register={register}
          error={errors.confirm?.message}
        />
        <button className={styles.access}>Entrar</button>
        <footer className={styles.footer}>
          <span>
            Já tem cadastro?
            <button
              className={styles.link}
              type="button"
              onClick={() => setView("login")}
            >
              Entre
            </button>
          </span>
        </footer>
      </form>
    </>
  );
}
