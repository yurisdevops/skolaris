import type { JSX } from "react";
import { Navigate } from "react-router";
import { Loading } from "../components/Loading";
import { useAuthState } from "../hooks/useAuthState";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { uid, loading } = useAuthState();

  if (loading) {
    return <Loading />;
  }

  if (!uid) {
    return <Navigate to="/" replace />;
  }

  return children;
}
