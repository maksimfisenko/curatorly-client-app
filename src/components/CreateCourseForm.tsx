import { Button, Center, FieldErrorText, FieldLabel, FieldsetContent, FieldsetLegend, FieldsetRoot, Flex, Input, NativeSelectField, NativeSelectIndicator, NativeSelectRoot } from "@chakra-ui/react";
import { Field } from "@/components/ui/field"
import { z } from "zod";
import { CreateCourseRequest} from "@/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const createCourseFormSchema = z
    .object({
        title: z.string().nonempty("Название курса не должно быть пустым").max(50, "Название курса не может быть длиннее 50 символов"),
        academicYear: z.string().nonempty("Необходимо указать учебный год")
    });

type CreateCourseFormData = z.infer<typeof createCourseFormSchema>;

interface CreateCourseFormProps {
    isPending: boolean;
    onFormSubmit: (createCourseRequest: CreateCourseRequest) => void;
};


const CreateCourseForm = ({isPending, onFormSubmit}: CreateCourseFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<CreateCourseFormData>({
        resolver: zodResolver(createCourseFormSchema)
    });

    return (
        <Flex align={"start"}>
            <form onSubmit={handleSubmit(onFormSubmit)} autoComplete="off" noValidate>
                <Center borderRadius={"md"} p={6} width={"25vw"}>
                    <FieldsetRoot size={"lg"} maxW={"md"}>
                        <FieldsetLegend textAlign={"center"} fontSize={"xl"}>
                            НОВЫЙ КУРС
                        </FieldsetLegend>

                        <FieldsetContent>
                            <Field required invalid={!!errors.title}>
                                <FieldLabel>Название курса</FieldLabel>
                                <Input id="title" type="text" placeholder="Мой курс" {...register("title")} />
                                <FieldErrorText>
                                    {errors.title?.message}
                                </FieldErrorText>
                            </Field>

                            <Field required invalid={!!errors.academicYear}>
                                <FieldLabel>Учебный год</FieldLabel>
                                <NativeSelectRoot>
                                    <NativeSelectField id="academicYear" {...register("academicYear")}>
                                        {Array.from({ length: 5 }, (_, i) => {
                                            const startYear = new Date().getFullYear() - 1 + i;
                                            const academicYear = `${startYear}-${startYear + 1}`;
                                            return (
                                                <option key={academicYear} value={academicYear}>
                                                    {academicYear}
                                                </option>
                                            );
                                        })}   
                                    </NativeSelectField>
                                    <NativeSelectIndicator />
                                </NativeSelectRoot>
                            </Field>
                        </FieldsetContent>

                        <Button type="submit" disabled={isPending}>
                            Создать
                        </Button>
                    </FieldsetRoot>
                </Center>
            </form>
		</Flex>
    );
};

export default CreateCourseForm;