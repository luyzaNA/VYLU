import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children, roles = [] }) {
    const { user, loading } = useAuth();

    if (loading)
        return null;

    if (user === undefined) {
        return <Navigate to="/login" replace />;

    }

    if (!user?.token) {
        console.log("No token, redirecting to /login");
        return <Navigate to="/login" replace />;
    }

    if (roles.length > 0 && !roles.includes(user.role)) {
        console.log("User role not authorized, redirecting to /unauthorized");
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}
