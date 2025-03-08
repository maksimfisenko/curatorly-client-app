import RegisterForm from "@/components/RegisterForm";
import { Toaster, toaster } from "@/components/ui/toaster";
import { RegisterRequest } from "@/models";
import { useRegister } from "@/usecases/useRegister";
import { useEffect } from "react";

const RegisterPage = () => {
    const {
        mutate,
        isPending,
        isError,
        isSuccess
    } = useRegister();

    const handleRegister = (registerRequest: RegisterRequest) => {
        console.log('register request', registerRequest);
        mutate(registerRequest);
    };

    useEffect(() => {
        if (isError) {
            toaster.create({
                type: "error",
                title: "Ошибка",
                description: "Пожалуйста, повторите попытку позже"
            });
        }
    }, [isError]);
    
    useEffect(() => {
        if (isSuccess) {
            toaster.create({
                type: "success",
                title: "Аккаунт создан",
                description: "Войдите в приложение"
            });
        }
    }, [isSuccess]);

    return (
        <>
            <RegisterForm
                isPending={isPending} 
                onFormSubmit={handleRegister} 
            />
            <Toaster />
        </>
    );
};

export default RegisterPage;