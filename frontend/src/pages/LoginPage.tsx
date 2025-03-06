import { Suspense } from "react";
import Login from "../components/Login.tsx";
import LoadingPage from "./LoadingPage.tsx";

const LoginPage = () => {
    return (
        <Suspense fallback={<LoadingPage />}>
            <Login />
        </Suspense>
    );
}

export default LoginPage;