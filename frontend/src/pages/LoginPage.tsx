import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Card, CardContent, CircularProgress, Stack, Box } from "@mui/material";

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("/api/user/check", { credentials: "include" });
                if (response.ok) {
                    navigate("/");
                }
            } catch (error) {
                console.error("認証チェック失敗:", error);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [navigate]);

    const handleLogin = async () => {
        try {
            const response = await fetch("/api/user/login", {
                method: "POST",
                credentials: "include",
            });
            if (response.ok) {
                navigate("/");
            } else {
                console.error("ログイン失敗");
            }
        } catch (error) {
            console.error("ログインエラー:", error);
        }
    };

    if (loading)
        return (
            <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Container>
        );

    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Card sx={{ boxShadow: 3, textAlign: "center", padding: "20px" }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            ログイン
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            アカウントでログインしてください。
                        </Typography>
                        <Stack direction="column" spacing={2}>
                            <Button variant="contained" color="primary" onClick={handleLogin}>
                                ログイン
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default LoginPage;
