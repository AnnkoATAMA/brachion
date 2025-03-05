import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { use } from "../utils/use";
import {AuthContext} from "./AuthContext.tsx";

const loginUser = async (email: string, password: string) => {
    return axios.post("http://localhost:8000/api/user/login", { email, password }, { withCredentials: true });
};

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleLogin = () => {
        const loginPromise = loginUser(email, password).then(() => {
            setIsAuthenticated(true);
            navigate("/");
        });
        use(loginPromise);
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
                <Box alignItems="center" sx={{ mt: 2 }}>
                    <Link to="/register">新規登録はこちら</Link>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;