import LoginForm from "@/components/LoginForm";
import { Toaster, toaster } from "@/components/ui/toaster";
import { AccessToken, LoginRequest } from "@/models";
import { useLogin } from "@/usecases/useLogin";
import { useNavigate } from "react-router";

const LoginPage = () => {
    const { mutate, isPending } = useLogin();
    const navigate = useNavigate();

    const handleLogin = (loginRequest: LoginRequest) => {
        console.log("login request", loginRequest);

        mutate(loginRequest, {
            onSuccess: (accessToken: AccessToken) => {
                console.log("access token", accessToken);
                toaster.create({
                    type: "success",
                    title: "Успешный вход",
                    description: "Добро пожаловать"
                });

                localStorage.setItem("accessToken", accessToken.authentication_token);

                navigate("/projects");
            },
            onError: () => {
                toaster.create({
                    type: "error",
                    title: "Ошибка",
                    description: "Пожалуйста, повторите попытку позже"
                });
            }
        });
    };

    return (
        <>
            <LoginForm
                isPending={isPending} 
                onFormSubmit={handleLogin} 
            />
            <Toaster />
        </>
    );
};

export default LoginPage;