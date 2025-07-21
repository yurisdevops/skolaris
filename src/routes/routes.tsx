import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router";
import { Layout } from "../components/Layout/Layout";
import { Home } from "../pages/Home/Home";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuthState } from "../hooks/useAuthState";
import { Loading } from "../components/Loading";
import { TeacherCreate } from "../pages/Teachers/TeacherCreate";

// Lazy-loaded pages
const Dashboard = React.lazy(() => import("../pages/Dashboard/Dashboard"));
const Classes = React.lazy(() => import("../pages/Classes/Classes"));
const Profile = React.lazy(() => import("../pages/Profile/Profile"));
const Teachers = React.lazy(() => import("../pages/Teachers/Teachers"));
const Students = React.lazy(() => import("../pages/Students/Students"));
const Guardians = React.lazy(() => import("../pages/Guardians/Guardians"));
const Grades = React.lazy(() => import("../pages/Grades/Grades"));
const Finance = React.lazy(() => import("../pages/Finance/Fianance"));
const Settings = React.lazy(() => import("../pages/Settings/Settings"));
const Staff = React.lazy(() => import("../pages/Staff/Staff"));

const RootRoute = () => {
  const { loading } = useAuthState();

  if (loading) {
    return <Loading />;
  }

  return <Layout />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth-loading",
    element: <Loading />,
  },
  {
    path: "/",
    element: <RootRoute />,
    children: [
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Carregando Dashboard...</div>}>
              <Dashboard />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/classes",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Carregando Turmas...</div>}>
              <Classes />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/config/profile",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Carregando Perfil...</div>}>
              <Profile />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/teachers",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Carregando Professores...</div>}>
              <Teachers />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/teachers/create",
        element: (
          <ProtectedRoute>
            <TeacherCreate />
          </ProtectedRoute>
        ),
      },
      {
        path: "/students",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Carregando Alunos...</div>}>
              <Students />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/guardians",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Carregando Responsáveis...</div>}>
              <Guardians />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/grades",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Carregando Notas...</div>}>
              <Grades />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/finance",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Carregando Finanças...</div>}>
              <Finance />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/staff",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Carregando Equipe...</div>}>
              <Staff />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Carregando Configurações...</div>}>
              <Settings />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
