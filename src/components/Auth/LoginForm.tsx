import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginSchema, type LoginData } from "../../schemas/loginSchema";
import { Input } from "../Form/Input";
import styles from "./Auth.module.scss";

import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { ZodError } from "zod";
import auth from "../../services/auth/auth";
import { setLoading, setUid } from "../../store/userSlice";

// Define as props esperadas pelo componente de login.
// `setView` é usado para alternar entre tela de login e cadastro.
interface LoginFormProps {
  setView: (access: "login" | "register") => void;
}

export function LoginForm({ setView }: LoginFormProps) {
  const navigate = useNavigate(); // Redireciona o usuário após login
  const dispatch = useDispatch(); // Dispara ações para atualizar o estado global

  // Inicializa o formulário com validação baseada no `loginSchema` (Zod).
  const {
    register, // Registra os inputs no formulário
    handleSubmit, // Manipulador do submit
    formState: { errors, isSubmitting }, // Erros de validação e estado de envio
  } = useForm({ resolver: zodResolver(loginSchema) });

  // Função que trata o envio do formulário de login
  async function onSubmit(data: LoginData) {
    try {
      dispatch(setLoading(true)); // Sinaliza que está carregando

      // Autentica o usuário com e-mail e senha via Firebase
      const { user } = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      toast.success("Login efetuado!"); // Exibe notificação de sucesso
      dispatch(setUid(user.uid)); // Salva o UID no estado global

      // Redireciona após 1 segundo para tela de carregamento
      setTimeout(() => {
        navigate("/auth-loading");
      }, 1000);
    } catch (error: any) {
      dispatch(setLoading(false)); // Cancela o estado de carregamento

      // Mostra erro de validação Zod
      if (error instanceof ZodError) {
        console.error("Erro de validação:", error.issues);
      } else {
        // Mostra erro genérico de autenticação
        console.error("Erro de autenticação:", error.message);
      }
    }
  }

  // Renderiza o formulário com campos de email e senha, tratamento de erros, botão de envio e link para cadastro
  return (
    <>
      <header className={styles.title}>
        <h3>Login</h3>
        <div className={styles.divisor}></div>
      </header>

      <form
        role="form"
        aria-label="Login dos usuários"
        onSubmit={handleSubmit(onSubmit)} // Chama `onSubmit` ao enviar o formulário
        className={styles.form}
      >
        <label htmlFor="user">Email</label>
        <Input
          name="email"
          type="email"
          placeholder="example@example.com"
          register={register} // Conecta o campo ao formulário
          error={errors.email?.message} // Exibe erro se houver
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
              onClick={() => setView("register")} // Alterna para a tela de cadastro
            >
              Cadastre-se
            </button>
          </span>
        </footer>
      </form>
    </>
  );
}
