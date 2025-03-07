import { Button, Center, FieldsetContent, FieldsetLegend, FieldsetRoot, Flex, HStack, Input, Link, Separator } from "@chakra-ui/react";
import { Field } from "@/components/ui/field"

const RegisterForm = () => {
    return (
        <Flex flex={1} align={"center"} justify={"center"}>
            <Center border={"1px solid"} borderRadius={"md"} p={6}>
                <FieldsetRoot size={"lg"} maxW={"md"}>
                    <FieldsetLegend textAlign={"center"} fontSize={"xl"}>
                        Регистрация
                    </FieldsetLegend>

                    <Separator />

                    <FieldsetContent>
                        <HStack>
                            <Field label="Имя" flex={0.8}>
                                <Input name="name" type="text" placeholder="Иван" />
                            </Field>

                            <Field label="Фамилия" flex={1}>
                                <Input name="surname" type="text" placeholder="Иванов" />
                            </Field>
                        </HStack>
                        
                        <Field label="Электронная почта">
                            <Input name="email" type="email" placeholder="ivanov@example.com" />
                        </Field>

                        <Field label="Пароль">
                            <Input name="password" type="password" placeholder="********" />
                        </Field>

                        <Field label="Подтверждение пароля">
                            <Input name="passwordConfirmation" type="password" placeholder="********" />
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
		</Flex>
    );
};

export default RegisterForm;