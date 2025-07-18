import styles from "./Loading.module.scss";
import { motion } from "motion/react";
import { useAuthState } from "../../hooks/useAuthState";
import { useSecureLoading } from "../../hooks/useSecureLoading";

export function Loading() {
  const { uid } = useAuthState();

  const finalMessage = uid
    ? "Tudo pronto! Vamos começar 🎓"
    : "Usuário não identificado. Redirecionando...";

  const messages = [
    "Conectando você ao conhecimento...",
    "Carregando suas aulas e progresso...",
    "Sincronizando seus dados com a nuvem...",
    "Preparando sua experiência personalizada...",
    finalMessage,
  ];

  const { currentMessage, index } = useSecureLoading(messages);

  return (
    <div className={styles.loading}>
      <div className={styles.container}>
        <motion.div
          className={styles.spinner}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      <motion.p
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.6 }}
        className={styles.message}
      >
        {currentMessage}
      </motion.p>
    </div>
  );
}
