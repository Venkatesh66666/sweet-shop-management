import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
