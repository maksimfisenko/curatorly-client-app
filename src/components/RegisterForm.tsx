import { Button, Center, FieldErrorText, FieldsetContent, FieldsetLegend, FieldsetRoot, Flex, Input, Link, Separator } from "@chakra-ui/react";
import { Field } from "@/components/ui/field"
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const registerFormSchema = z
    .object({
        name: z.string().nonempty("Имя не должно быть пустым").max(15, "Имя не может быть длиннее 15 символов"),
        surname: z.string().nonempty("Фамилия не должна быть пустой").max(15, "Фамилия не может быть длиннее 15 символов"),
        email: z.string().email("Некорректный адрес электронной почты").max(30, "Электронная почта не может быть длиннее 30 символов"),
        password: z.string().min(8, "Пароль должен содержать минимум 8 символов").max(30, "Пароль не может быть длиннее 30 символов"),
        passwordConfirmation: z.string().min(8, "Пароль должен содержать минимум 8 символов").max(30, "Пароль не может быть длиннее 30 символов")
    })
    .refine(
        ({password, passwordConfirmation}) => {
            return password === passwordConfirmation
        },
        {
            message: "Пароли не совпадают",
            path: ["passwordConfirmation"]
        }
    );

type RegisterFormData = z.infer<typeof registerFormSchema>;

const RegisterForm = () => {

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema)
    });

    const handleFormSubmit = (registerRequest: FieldValues) => {
        console.log('register request', registerRequest)
    };

    return (
        <Flex flex={1} align={"center"} justify={"center"}>
            <form onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off" noValidate>
                <Center border={"1px solid"} borderRadius={"md"} p={6} width={"25vw"}>
                    <FieldsetRoot size={"lg"} maxW={"md"}>
                        <FieldsetLegend textAlign={"center"} fontSize={"xl"}>
                            Регистрация
                        </FieldsetLegend>

                        <Separator />

                        <FieldsetContent>
                            <Field label="Имя" required invalid={!!errors.name}>
                                <Input id="name" type="text" placeholder="Иван" {...register("name")} />
                                <FieldErrorText>
                                    {errors.name?.message}
                                </FieldErrorText>
                            </Field>

                            <Field label="Фамилия" required invalid={!!errors.surname}>
                                <Input id="surname" type="text" placeholder="Иванов" {...register("surname")} />
                                <FieldErrorText>
                                    {errors.surname?.message}
                                </FieldErrorText>
                            </Field>
                            
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

                            <Field label="Подтверждение пароля" required invalid={!!errors.passwordConfirmation}>
                                <Input id="passwordConfirmation" type="password" placeholder="********" {...register("passwordConfirmation")} />
                                <FieldErrorText>
                                    {errors.passwordConfirmation?.message}
                                </FieldErrorText>
                            </Field>
                        </FieldsetContent>

                        <Button type="submit">
                            Зарегистрироваться
                        </Button>

                        <Link alignSelf={"center"}>
                            Уже есть аккаунт? Войдите здесь
                        </Link>
                    </FieldsetRoot>
                </Center>
            </form>
		</Flex>
    );
};

export default RegisterForm;