import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setLoading } from "../store/userSlice";
import { useAuthState } from "./useAuthState";

// Hook personalizado que gerencia a exibição sequencial de mensagens de carregamento
// e redireciona o usuário ao final com base na autenticação.

export function useSecureLoading(messages: string[]) {
  // `current` controla o índice da mensagem atual que está sendo exibida.
  const [current, setCurrent] = useState(0);

  const dispatch = useDispatch(); // Usado para disparar ações Redux.
  const navigate = useNavigate(); // Usado para redirecionar o usuário.
  const { uid } = useAuthState(); // Verifica se o usuário está autenticado.
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Referência ao timer para poder limpar posteriormente.

  // Redireciona o usuário após o carregamento terminar.
  // Se `uid` existir, o usuário é enviado ao dashboard; senão, à página inicial.
  const handleFinalRedirect = () => {
    dispatch(setLoading(false));
    navigate(uid ? "/dashboard" : "/");
  };

  // Efeito que inicia o ciclo de exibição das mensagens.
  useEffect(() => {
    // Timer que atualiza `current` a cada 1 segundo.
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        // Se chegou na última mensagem do array...
        if (prev === messages.length - 1) {
          clearInterval(timerRef.current!); // Para o timer para evitar novas atualizações.

          // Exibe um frame adicional antes de redirecionar.
          setTimeout(() => {
            setCurrent(prev + 1); // Último incremento visual.
          }, 1000);

          // Aguarda mais um pouco e então faz o redirecionamento.
          setTimeout(handleFinalRedirect, 1800);

          return prev; // Evita ultrapassar os limites do array.
        }

        // Continua avançando para a próxima mensagem.
        return prev + 1;
      });
    }, 1000);

    // Ao desmontar o componente, garante que o timer seja limpo.
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Retorna dados úteis para acompanhar o progresso visual:
  return {
    index: current, // Índice atual da mensagem.
    total: messages.length + 1, // Inclui um frame extra além das mensagens.
    progressPercent: Math.round(((current + 1) / (messages.length + 1)) * 100), // Porcentagem de progresso baseada no total.
  };
}
