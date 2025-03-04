import { Navigate } from "react-router-dom";
import {ReactNode} from "react";
interface ProtectRouteProps {
    children: ReactNode;
}
const ProtectRoute = ({ children }:ProtectRouteProps) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default ProtectRoute;