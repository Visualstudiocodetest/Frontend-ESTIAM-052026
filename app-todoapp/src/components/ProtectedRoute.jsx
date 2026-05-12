import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, Loading } = useAuth();
  if (Loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}