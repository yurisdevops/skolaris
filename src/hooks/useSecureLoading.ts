import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useAuthState } from "./useAuthState";
import { setLoading } from "../store/userSlice";

export function useSecureLoading(messages: string[]) {
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid } = useAuthState();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => {
        if (prev === messages.length - 1) {
          clearInterval(timer);
          setTimeout(() => {
            dispatch(setLoading(false));
            navigate(uid ? "/dashboard" : "/");
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return {
    currentMessage: messages[current],
    index: current,
    total: messages.length,
  };
}
