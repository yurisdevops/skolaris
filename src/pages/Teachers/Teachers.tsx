import { Link } from "react-router";

import { useEffect, useState } from "react";
import { TeacherCard } from "../../components/Teacher/Card/TeacherCard";
import { TeacherDetails } from "../../components/Teacher/Details/TeacherDetails";
import { FilterSelect } from "../../components/Teacher/FilterSelect";
import { NotificationsPanel } from "../../components/Teacher/NotificationsPanel/NotificationsPanel";
import { SearchBar } from "../../components/Teacher/SearchBar";
import { SummaryCards } from "../../components/Teacher/SummaryCards/SummaryCards";
import { TeacherStatusChart } from "../../components/Teacher/TeacherStatusChart";
import { UpcomingEvents } from "../../components/Teacher/UpcomingEvents/UpcomingEvents";
import styles from "./Teacher.module.scss";

type Teacher = {
  id: string;
  nome: string;
  disciplinas: string[];
  email: string;
  status: string;
};

const stats = {
  total: 24,
  professores: 18,
  coordenadores: 4,
  inativos: 2,
};
export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filtered, setFiltered] = useState<Teacher[]>([]);
  const [filterDiscipline, setFilterDiscipline] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  useEffect(() => {
    // Simulação de fetch — substituir por chamada ao Firestore
    const mock = [
      {
        id: "1",
        nome: "Ana",
        disciplinas: ["Math"],
        email: "ana@escola.com",
        status: "ativo",
      },
      {
        id: "2",
        nome: "Carlos",
        disciplinas: ["History"],
        email: "carlos@escola.com",
        status: "inativo",
      },
    ];
    setTeachers(mock);
    setFiltered(mock);
  }, []);

  const handleSearch = (query: string) => {
    const result = teachers.filter(
      (t) =>
        t.nome.toLowerCase().includes(query.toLowerCase()) ||
        t.disciplinas.some((d) => d.toLowerCase().includes(query.toLowerCase()))
    );
    setFiltered(
      filterDiscipline
        ? result.filter((t) => t.disciplinas.includes(filterDiscipline))
        : result
    );
  };

  const handleFilter = (discipline: string) => {
    setFilterDiscipline(discipline);
    setFiltered(
      teachers.filter((t) => !discipline || t.disciplinas.includes(discipline))
    );
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h2>Painel de Professores</h2>
        <div className={styles.actionsHeader}>
          <Link to="/teachers/create" className={styles.createButton}>
            + Novo professor
          </Link>
          <button onClick={() => {}}>Exportar dados</button>
        </div>
      </header>

      <section className={styles.dashboardGrid}>
        {" "}
        <section className={styles.mainContent}>
          <SummaryCards stats={stats} />
          <SearchBar onSearch={handleSearch} />
          <FilterSelect onSelect={handleFilter} />
          <p>{filtered.length} professores encontrados</p>

          <div className={styles.cardsGrid}>
            {filtered.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                onClick={() => setSelectedTeacher(teacher)}
              />
            ))}
          </div>
        </section>
        <aside className={styles.sidebar}>
          <TeacherStatusChart data={stats} />
          <NotificationsPanel />
          <UpcomingEvents />
        </aside>
      </section>

      {selectedTeacher && (
        <TeacherDetails
          teacher={selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
        />
      )}
    </main>
  );
}
