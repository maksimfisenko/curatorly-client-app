import { Button, Center, FieldErrorText, FieldsetContent, FieldsetLegend, FieldsetRoot, Flex, Input, Link, Separator } from "@chakra-ui/react";
import { Field } from "@/components/ui/field"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginRequest } from "@/models";

const loginFormSchema = z
    .object({
        email: z.string().email("Некорректный адрес электронной почты").max(30, "Электронная почта не может быть длиннее 30 символов"),
        password: z.string().min(8, "Пароль должен содержать минимум 8 символов").max(30, "Пароль не может быть длиннее 30 символов")
    });

type LoginFormData = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
    isPending: boolean;
    onFormSubmit: (loginRequest: LoginRequest) => void;
};

const LoginForm = ({isPending, onFormSubmit}: LoginFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema)
    });

    return (
        <Flex flex={1} align={"center"} justify={"center"}>
            <form onSubmit={handleSubmit(onFormSubmit)} autoComplete="off" noValidate>
                <Center border={"1px solid"} borderRadius={"md"} p={6} width={"25vw"}>
                    <FieldsetRoot size={"lg"} maxW={"md"}>
                        <FieldsetLegend textAlign={"center"} fontSize={"xl"}>
                            Вход в аккаунт
                        </FieldsetLegend>

                        <Separator />

                        <FieldsetContent>
                            <Field label="Электронная почта" required invalid={!!errors.email}>
                                <Input id="email" type="email" placeholder="ivanov@example.com" {...register("email")} />
                                <FieldErrorText>
                                    {errors.email?.message}
                                </FieldErrorText>
                            </Field>

                            <Field label="Пароль" required invalid={!!errors.password}>
                                <Input id="password" type="password" placeholder="********" {...register("password")} />
                                <FieldErrorText>
                                    {errors.password?.message}
                                </FieldErrorText>
                            </Field>
                        </FieldsetContent>

                        <Button type="submit" disabled={isPending}>
                            Войти в аккаунт
                        </Button>

                        <Link alignSelf={"center"}>
                            Нет аккаунта? Зарегистрируйтесь
                        </Link>
                    </FieldsetRoot>
                </Center>
            </form>
        </Flex>
    );
};

export default LoginForm;