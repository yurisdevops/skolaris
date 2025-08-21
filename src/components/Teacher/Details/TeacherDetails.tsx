import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store";
import { updateStatusTeacher } from "../../../store/teacherSlice";
import styles from "./TeacherDetails.module.scss";

interface TeacherDetailsProps {
  teacher: {
    id: string;
    nome: string;
    email: string;
    disciplinas: string[];
    status: string;
  };
  onClose: () => void;
}

export function TeacherDetails({ teacher, onClose }: TeacherDetailsProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

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
          <button
            className={styles.edit}
            onClick={() => setIsEditing(!isEditing)}
            disabled={isEditing}
          >
            Editar
          </button>
          <button
            className={styles.danger}
            disabled={!isEditing}
            onClick={() => {
              const novoStatus =
                teacher.status === "ativo" ? "inativo" : "ativo";
              dispatch(
                updateStatusTeacher({ id: teacher.id, status: novoStatus })
              );
              onClose();
            }}
          >
            {teacher.status === "ativo" ? "Desativar" : "Ativar"}
          </button>
        </div>
      </aside>
    </section>
  );
}
