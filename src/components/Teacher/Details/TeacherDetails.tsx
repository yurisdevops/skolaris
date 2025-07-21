import { useEffect, useRef } from "react";
import styles from "./TeacherDetails.module.scss";

interface TeacherDetailsProps {
  teacher: {
    nome: string;
    email: string;
    disciplinas: string[];
    status: string;
  };
  onClose: () => void;
}

export function TeacherDetails({ teacher, onClose }: TeacherDetailsProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    function handleCLickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleCLickOutside);
    return () => {
      document.removeEventListener("mousedown", handleCLickOutside);
    };
  }, [onClose]);
  return (
    <section className={styles.overlay}>
      <aside className={styles.modal} ref={modalRef}>
        <button className={styles.close} onClick={onClose}>
          x
        </button>
        <h3>Detalhes do Professor</h3>
        <p>
          <strong>Nome:</strong>
          {teacher.nome}
        </p>
        <p>
          <strong>Email:</strong>
          {teacher.email}
        </p>
        <p>
          <strong>Status:</strong>
          {teacher.status}
        </p>
        <p>
          <strong>Disciplinas:</strong>
          {teacher.disciplinas.join(", ")}
        </p>
        <div className={styles.actions}>
          <button className={styles.edit}>Editar</button>
          <button className={styles.danger}> Desativar</button>
        </div>
      </aside>
    </section>
  );
}
