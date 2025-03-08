import RegisterForm from "@/components/RegisterForm";
import { Toaster, toaster } from "@/components/ui/toaster";
import publicApi from "@/config/api-client";
import { RegisterRequest } from "@/models";
import { useEffect, useState } from "react";

const RegisterPage = () => {
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false)
    const [pending, setPending] = useState<boolean>(false)

    const handleRegister = (registerRequest: RegisterRequest) => {
        console.log('register request', registerRequest);
    
        setPending(true);
        setError(false);
        setSuccess(false);
            
        publicApi.post("/api/v1/users/register", registerRequest)
            .then(() => setSuccess(true))
            .catch(() => setError(true))
            .finally(() => setPending(false));
    };

    useEffect(() => {
        if (error) {
            toaster.create({
                type: "error",
                title: "Ошибка",
                description: "Пожалуйста, повторите попытку позже"
            });
            setError(false);
        }
    }, [error]);
    
    useEffect(() => {
        if (success) {
            toaster.create({
                type: "success",
                title: "Аккаунт создан",
                description: "Войдите в приложение"
            });
            setSuccess(false);
        }
    }, [success]);

    return (
        <>
            <RegisterForm
                isPending={pending} 
                onFormSubmit={handleRegister} 
            />
            <Toaster />
        </>
    );
};

export default RegisterPage;