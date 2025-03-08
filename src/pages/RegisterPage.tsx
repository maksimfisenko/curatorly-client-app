import RegisterForm from "@/components/RegisterForm";
import { Toaster, toaster } from "@/components/ui/toaster";
import { RegisterRequest } from "@/models";
import { useRegister } from "@/usecases/useRegister";

const RegisterPage = () => {
    const {
        mutate,
        isPending
    } = useRegister();

    const handleRegister = (registerRequest: RegisterRequest) => {
        console.log('register request', registerRequest);
        mutate(registerRequest, {
            onSuccess: () => {
                toaster.create({
                    type: "success",
                    title: "Аккаунт создан",
                    description: "Войдите в приложение"
                });
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
            <RegisterForm
                isPending={isPending} 
                onFormSubmit={handleRegister} 
            />
            <Toaster />
        </>
    );
};

export default RegisterPage;