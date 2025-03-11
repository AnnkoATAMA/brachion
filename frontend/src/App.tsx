import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTemplateTheme } from "./utils/theme";
import LoginPage from "./pages/LoginPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import RoomPage from "./pages/RoomPage.tsx";

const App = () => {
    const theme = useTemplateTheme();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route index element={ <HomePage />} />
                <Route path="/room" element={<RoomPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;
