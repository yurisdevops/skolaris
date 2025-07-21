import styles from "./NotificationsPanel.module.scss";

export function NotificationsPanel() {
  const notifications = [
    { id: "1", título: "Reunião pedagógica hoje às 15h" },
    { id: "2", título: "Atualizar dados dos professores até sexta" },
  ];

  return (
    <div className={styles.panel}>
      <h4>Notificações</h4>
      <ul>
        {notifications.map((note) => (
          <li key={note.id}>{note.título}</li>
        ))}
      </ul>
    </div>
  );
}
