import { AddCuratorRequest } from "@/models";
import { Button, FieldErrorText, FieldLabel, FieldRequiredIndicator, FieldRoot, FieldsetContent, FieldsetLegend, FieldsetRoot, Flex, Input, RadioGroupItem, RadioGroupItemHiddenInput, RadioGroupItemIndicator, RadioGroupItemText, RadioGroupRoot, Separator, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const statuses = [
    { value: "Активный", label: "Активный" },
    { value: "Больше не работает", label: "Больше не работает" },
    { value: "Временно не работает", label: "Временно не работает" },
  ]

const addCuratorFormSchema = z
    .object({
        name: z.string().nonempty("Укажите имя куратора").max(15, "Имя куратора не может быть больше 15 символов"),
        surname: z.string().nonempty("Укажите фамилию куратора").max(15, "Фамилия куратора не может быть больше 15 символов"),
        birthday: z.string().date("Укажите дату рождения"),
        status: z.string({ message: "Укажите статус куратора"}),
    });

type AddCuratorFormData = z.infer<typeof addCuratorFormSchema>;

interface AddCuratorFormProps {
    isPending: boolean;
    onFormSubmit: (addCuratorRequest: AddCuratorRequest) => void;
};

const AddCuratorForm = ({isPending, onFormSubmit}: AddCuratorFormProps) => {
    const { control, register, handleSubmit, formState: {errors} } = useForm<AddCuratorFormData>({resolver: zodResolver(addCuratorFormSchema)});

    return (
        <Flex flex={1} justify={"center"} minW={"50vw"} mt={5}>
            <form onSubmit={handleSubmit(onFormSubmit)} autoComplete="off" noValidate>
                <FieldsetRoot width={"30vw"}>
                    <FieldsetLegend textAlign={"center"} fontSize={"lg"}>
                        ДОБАВИТЬ НОВОГО КУРАТОРА
                    </FieldsetLegend>

                    <Separator />

                    <FieldsetContent>
                        <FieldRoot required invalid={!!errors.name}>
                            <FieldLabel>
                                Имя
                                <FieldRequiredIndicator />
                            </FieldLabel>
                            <Input id="name" type="text" placeContent={"Иван"} {...register("name")} />
                            <FieldErrorText>{errors.name?.message}</FieldErrorText>
                        </FieldRoot>

                        <FieldRoot required invalid={!!errors.surname}>
                            <FieldLabel>
                                Фамилия
                                <FieldRequiredIndicator />
                            </FieldLabel>
                            <Input id="surname" type="text" placeContent={"Иванов"} {...register("surname")} />
                            <FieldErrorText>{errors.surname?.message}</FieldErrorText>
                        </FieldRoot>

                        <FieldRoot required invalid={!!errors.birthday}>
                            <FieldLabel>
                                Дата рождения
                                <FieldRequiredIndicator />
                            </FieldLabel>
                            <Input id="birthday" type="date" placeContent={"01.01.2001"} {...register("birthday")} />
                            <FieldErrorText>{errors.birthday?.message}</FieldErrorText>
                        </FieldRoot>

                        <FieldRoot required invalid={!!errors.status}>
                            <FieldLabel>
                                Текущий статус
                                <FieldRequiredIndicator />
                            </FieldLabel>
                            <Controller
                                name="status"
                                control={control}
                                render={({field}) => (
                                    <RadioGroupRoot
                                        name={field.name}
                                        value={field.value}
                                        onValueChange={({value}) => {
                                            field.onChange(value)
                                        }}
                                    >
                                        <VStack alignItems={"self-start"}>
                                            {statuses.map((status) => (
                                                <RadioGroupItem key={status.value} value={status.value}>
                                                    <RadioGroupItemHiddenInput onBlur={field.onBlur} />
                                                    <RadioGroupItemIndicator />
                                                    <RadioGroupItemText>{status.label}</RadioGroupItemText>
                                                </RadioGroupItem>
                                            ))}
                                         </VStack>
                                    </RadioGroupRoot>
                                 )}
                            />
                            <FieldErrorText>{errors.status?.message}</FieldErrorText>
                        </FieldRoot>
                    </FieldsetContent>

                    <Button type="submit" disabled={isPending}>
                        Добавить
                    </Button>
                </FieldsetRoot>
            </form>
        </Flex>
    );
};

export default AddCuratorForm;