import { createBrowserRouter } from "react-router";
import { Layout } from "../components/Layout";
import { Dashboard } from "../pages/Dashboard";
import { Classes } from "../pages/Classes";
import { Home } from "../pages/Home";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuthState } from "../hooks/useAuthState";
import { Loading } from "../components/Loading";
import { Profile } from "../pages/Profile";
import { Teachers } from "../pages/Teachers";
import { Students } from "../pages/Students";
import { Guardians } from "../pages/Guardians";
import { Grades } from "../pages/Grades";
import { Finance } from "../pages/Finance";
import { Settings } from "../pages/Settings";
import { Staff } from "../pages/Staff";

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
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/classes",
        element: (
          <ProtectedRoute>
            <Classes />
          </ProtectedRoute>
        ),
      },
      {
        path: "/config/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/teachers",
        element: (
          <ProtectedRoute>
            <Teachers />
          </ProtectedRoute>
        ),
      },
      {
        path: "/students",
        element: (
          <ProtectedRoute>
            <Students />
          </ProtectedRoute>
        ),
      },
      {
        path: "/guardians",
        element: (
          <ProtectedRoute>
            <Guardians />
          </ProtectedRoute>
        ),
      },
      {
        path: "/grades",
        element: (
          <ProtectedRoute>
            <Grades />
          </ProtectedRoute>
        ),
      },
      {
        path: "/finance",
        element: (
          <ProtectedRoute>
            <Finance />
          </ProtectedRoute>
        ),
      },
      {
        path: "/staff",
        element: (
          <ProtectedRoute>
            <Staff />
          </ProtectedRoute>
        ),
      },

      {
        path: "/settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
