import { Navigate } from "react-router-dom";
import { ReactNode, useContext } from "react";
import { AuthContext } from "./AuthContext";

interface ProtectRouteProps {
    children: ReactNode;
}

const ProtectRoute = ({ children }: ProtectRouteProps) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectRoute;
