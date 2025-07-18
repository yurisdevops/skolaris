import { createBrowserRouter } from "react-router";
import { Layout } from "../components/Layout";
import { Dashboard } from "../pages/Dashboard";
import { Classes } from "../pages/Classes";
import { Home } from "../pages/Home";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuthState } from "../hooks/useAuthState";
import { Loading } from "../components/Loading";
import { Profile } from "../pages/Profile";

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
    ],
  },
]);

export default router;
