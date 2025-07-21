import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useAuthState } from "./useAuthState";
import { setLoading } from "../store/userSlice";

export function useSecureLoading(messages: string[]) {
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid } = useAuthState();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleFinalRedirect = () => {
    dispatch(setLoading(false));
    navigate(uid ? "/dashboard" : "/");
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        // Última mensagem do array
        if (prev === messages.length - 1) {
          clearInterval(timerRef.current!);

          // Adiciona um frame extra para a mensagem final
          setTimeout(() => {
            setCurrent(prev + 1); // entra no estado visual final
          }, 1000);

          // Redireciona após esse último frame
          setTimeout(handleFinalRedirect, 1800);
          return prev;
        }

        return prev + 1;
      });
    }, 1700);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return {
    index: current,
    total: messages.length + 1, // inclui etapa final
    progressPercent: Math.round(((current + 1) / (messages.length + 1)) * 100),
  };
}
