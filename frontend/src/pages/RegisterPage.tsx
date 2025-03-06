import { Suspense } from "react";
import Register from "../components/Register.tsx";
import LoadingPage from "./LoadingPage.tsx";

const RegisterPage = () => {
    return (
        <Suspense fallback={<LoadingPage/>}>
            <Register />
        </Suspense>
    );
}

export default RegisterPage;