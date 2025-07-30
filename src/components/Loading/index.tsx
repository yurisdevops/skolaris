// Componente de tela de carregamento que exibe mensagens animadas com barra de progresso.
// Utiliza hooks personalizados para definir mensagens e controle de redirecionamento dinâmico.

import { motion } from "motion/react";
import { useAuthState } from "../../hooks/useAuthState"; // Obtém informações de autenticação do usuário
import { useSecureLoading } from "../../hooks/useSecureLoading"; // Controla a sequência e tempo das mensagens de loading
import styles from "./Loading.module.scss"; // Estilos visuais da tela de carregamento

export function Loading() {
  const { uid } = useAuthState(); // Verifica se o usuário está autenticado

  // Define a última mensagem com base na presença de UID
  const finalMessage = uid
    ? "Tudo pronto! Vamos começar..." // Usuário autenticado
    : "Usuário não identificado. Redirecionando..."; // Usuário anônimo

  // Lista de mensagens exibidas durante o carregamento
  const messages = [
    "Conectando você ao conhecimento...",
    "Carregando suas aulas e progresso...",
    "Sincronizando seus dados com a nuvem...",
    "Preparando sua experiência personalizada...",
    finalMessage, // Última mensagem adaptada
  ];

  // Hook que gerencia o índice atual da mensagem e progresso em porcentagem
  const { index, progressPercent } = useSecureLoading(messages);

  // Renderiza barra de progresso e mensagem com animação suave
  return (
    <div className={styles.loading}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progressPercent}%` }} // Atualiza largura da barra dinamicamente
        />
      </div>

      <motion.p
        key={index} // Garante nova animação ao trocar a mensagem
        initial={{ opacity: 0, y: 10 }} // Estado inicial da animação
        animate={{ opacity: 1, y: 0 }} // Estado final (visível e posicionado)
        exit={{ opacity: 0, y: -10 }} // Estado ao sair
        transition={{ duration: 0.6 }} // Tempo da transição
        className={styles.message}
      >
        {index < messages.length ? (
          messages[index] // Exibe mensagem atual
        ) : (
          <span className={styles.messageFinal}>
            Pronto! Entrando na plataforma...
          </span>
        )}
      </motion.p>
    </div>
  );
}
