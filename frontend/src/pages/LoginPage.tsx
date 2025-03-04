import { Suspense } from "react";
import {CircularProgress} from "@mui/material";
import Login from "../components/Login.tsx";

const LoginPage = () => {
    return (
        <Suspense fallback={<CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />}>
            <Login />
        </Suspense>
    );
}

export default LoginPage;