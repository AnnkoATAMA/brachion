import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await fetch("/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                navigate("/login");
            } else {
                alert("Registration failed");
            }
        } catch (error) {
            console.error("Registration error", error);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Box>
                <Typography variant="h4" align="center" gutterBottom>
                    Register
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
                    onClick={handleRegister}
                >
                    新規登録
                </Button>
            </Box>
        </Container>
    );
}
export default Register;