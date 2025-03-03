import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { CircularProgress, Container } from "@mui/material";

interface ProtectRouteProps {
    children: ReactNode;
}

const ProtectRoute = ({ children }: ProtectRouteProps) => {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("/api/user/check", { credentials: "include" });
                setAuthenticated(response.ok);
            } catch (error) {
                console.error("認証チェック失敗:", error);
                setAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    if (authenticated === null)
        return (
            <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Container>
        );

    if (!authenticated) return <Navigate to="/login" replace />;

    return <>{children}</>;
};

export default ProtectRoute;
