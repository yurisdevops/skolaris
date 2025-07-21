import styles from "./UpcomingEvents.module.scss";
export function UpcomingEvents() {
  const events = [
    { id: "1", data: "15/08", tipo: "Prova de Matemática" },
    { id: "2", data: "17/08", tipo: "Reunião com coordenação" },
  ];

  return (
    <div className={styles.events}>
      <h4>Próximos eventos</h4>
      <ul>
        {events.map((e) => (
          <li key={e.id}>
            <strong>{e.data}</strong> - {e.tipo}
          </li>
        ))}
      </ul>
    </div>
  );
}
