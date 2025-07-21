import { useForm } from "react-hook-form";
import styles from "./Auth.module.scss";
import { Input } from "../Form/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginData } from "../../schemas/loginSchema";
import { useDispatch } from "react-redux";

import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../services/auth/auth";
import { useNavigate } from "react-router";
import { ZodError } from "zod";
import { setLoading, setUid } from "../../store/userSlice";
import toast from "react-hot-toast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import db from "../../services/firestore/firestore";

interface LoginFormProps {
  setView: (access: "login" | "register") => void;
}
export function LoginForm({ setView }: LoginFormProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  async function criarEscola(uid: string) {
    const escolaRef = doc(db, "escolas", uid);
    const escolaSnap = await getDoc(escolaRef);

    try {
      if (!escolaSnap.exists()) {
        await setDoc(escolaRef, {
          dataCadastro: new Date(),
          status: "ativa",
          perfilCompleto: false,
        });
        console.log("Escola criada com sucesso");
      }
    } catch (error) {
      console.log("Escola já existe", error);
    }
  }

  async function onSubmit(data: LoginData) {
    try {
      dispatch(setLoading(true));
      const { user } = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      toast.success("Login efetuado!");
      dispatch(setUid(user.uid));

      await criarEscola(user.uid);

      setTimeout(() => {
        navigate("/auth-loading");
      }, 1000);
    } catch (error: any) {
      dispatch(setLoading(false));
      if (error instanceof ZodError) {
        console.error("Erro de validação:", error.issues);
      } else {
        console.error("Erro de autenticação:", error.message);
      }
    }
  }
  return (
    <>
      <header className={styles.title}>
        <h3>Login</h3>
        <div className={styles.divisor}></div>
      </header>
      <form
        role="form"
        aria-label="Login dos usuários"
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
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
        <button className={styles.access} disabled={isSubmitting}>
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
        <footer className={styles.footer}>
          <span>
            Ainda não tem cadastro?
            <button
              className={styles.link}
              type="button"
              onClick={() => setView("register")}
            >
              Cadastre-se
            </button>
          </span>
        </footer>
      </form>
    </>
  );
}
