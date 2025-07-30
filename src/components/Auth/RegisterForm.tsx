import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import {
  registerSchema,
  type RegisterData,
} from "../../schemas/registerSchema";
import auth from "../../services/auth/auth";
import { Input } from "../Form/Input";
import styles from "./Auth.module.scss";

// Componente de formulário para cadastro de novo usuário.
// Permite alternar para a tela de login via prop `setView`.

interface RegisterFormProps {
  setView: (access: "login" | "register") => void; // Função que alterna entre "login" e "register"
}

export function RegisterForm({ setView }: RegisterFormProps) {
  // Inicializa o formulário com validação integrada via Zod (schema de cadastro)
  const {
    register, // Registra inputs para o react-hook-form
    handleSubmit, // Manipula envio do formulário
    reset, // Reseta os campos após sucesso
    formState: { errors }, // Contém erros de validação
  } = useForm({ resolver: zodResolver(registerSchema) });

  // Função executada ao submeter o formulário
  async function onSubmit(data: RegisterData) {
    try {
      // Cria novo usuário no Firebase Authentication usando email e senha
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      reset(); // Limpa os campos após cadastro

      toast.success("Usuário criado"); // Notificação de sucesso
    } catch (error) {
      // Exibe erros de validação Zod no console
      if (error instanceof ZodError) {
        console.error("Erro de validação", error.issues);
      } else {
        // Erros gerais na criação do usuário
        console.error("Erro ao criar a conta do usuário:", error);
      }
    }
  }

  // JSX que renderiza o formulário de cadastro
  return (
    <>
      <header className={styles.title}>
        <h3>Cadastro</h3>
        <div className={styles.divisor}></div>
      </header>

      <form
        role="form"
        aria-label="Cadastro dos usuários"
        onSubmit={handleSubmit(onSubmit)} // Executa a função de cadastro ao enviar o formulário
        className={styles.form}
      >
        <label htmlFor="user">Email</label>
        <Input
          name="email"
          type="email"
          placeholder="example@example.com"
          register={register}
          error={errors.email?.message} // Mostra mensagem de erro se houver
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

        <button className={styles.access}>Cadastrar</button>

        <footer className={styles.footer}>
          <span>
            Já tem cadastro?
            <button
              className={styles.link}
              type="button"
              onClick={() => setView("login")} // Alterna para o formulário de login
            >
              Entre
            </button>
          </span>
        </footer>
      </form>
    </>
  );
}
