import { Button, Center, FieldErrorText, FieldsetContent, FieldsetLegend, FieldsetRoot, Flex, Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field"
import { z } from "zod";
import { CreateProjectRequest } from "@/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const createProjectFormSchema = z
    .object({
        title: z.string().nonempty("Название проекта не должно быть пустым").max(50, "Название проекта не может быть длиннее 50 символов"),
    });

type CreateProjectFormData = z.infer<typeof createProjectFormSchema>;

interface CreateProjectFormProps {
    isPending: boolean;
    onFormSubmit: (createProjectRequest: CreateProjectRequest) => void;
};


const CreateProjectForm = ({isPending, onFormSubmit}: CreateProjectFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<CreateProjectFormData>({
        resolver: zodResolver(createProjectFormSchema)
    });

    return (
        <Flex align={"start"}>
            <form onSubmit={handleSubmit(onFormSubmit)} autoComplete="off" noValidate>
                <Center borderRadius={"md"} p={6} width={"25vw"}>
                    <FieldsetRoot size={"lg"} maxW={"md"}>
                        <FieldsetLegend textAlign={"center"} fontSize={"xl"}>
                            НОВЫЙ ПРОЕКТ
                        </FieldsetLegend>

                        <FieldsetContent>
                            <Field required invalid={!!errors.title}>
                                <Input id="title" type="text" placeholder="Название проекта" {...register("title")} />
                                <FieldErrorText>
                                    {errors.title?.message}
                                </FieldErrorText>
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

export default CreateProjectForm;