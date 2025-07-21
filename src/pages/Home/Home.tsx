import styles from "./Home.module.scss";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LoginForm } from "../../components/Auth/LoginForm";
import { RegisterForm } from "../../components/Auth/RegisterForm";

export function Home() {
  const [view, setView] = useState<"login" | "register">("login");
  return (
    <main className={styles.home}>
      <img
        src="/images/background.webp"
        loading="lazy"
        alt="Background"
        className={styles.background}
      />
      <img
        src="/images/logo.webp"
        className={styles.logo}
        alt="Logo Skolaris"
      />
      <section className={styles.modal}>
        <AnimatePresence mode="wait">
          {view === "login" ? (
            <motion.article
              key={"login"}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.login}
            >
              <LoginForm setView={setView} />
            </motion.article>
          ) : (
            <motion.article
              key={"register"}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.register}
            >
              <RegisterForm setView={setView} />
            </motion.article>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
