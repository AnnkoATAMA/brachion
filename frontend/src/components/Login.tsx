import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Login = () =>  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch("/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const { token } = await response.json();
                localStorage.setItem("jwt", token);
                navigate("/");
            } else {
                alert("Login failed");
            }
        } catch (error) {
            console.error("Login error", error);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Box>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
            </Box>
            <Box>
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </Box>
        </Container>
    );
}

export default Login;