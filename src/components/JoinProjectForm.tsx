import { Button, Center, FieldErrorText, FieldsetContent, FieldsetLegend, FieldsetRoot, Flex, Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field"
import { z } from "zod";
import { JoinProjectRequest } from "@/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const joinProjectFormSchema = z
    .object({
        accessCode: z.string().length(10, "Код доступа должен содержать 10 символов"),
    });

type JoinProjectFormData = z.infer<typeof joinProjectFormSchema>;

interface JoinProjectFormProps {
    isPending: boolean;
    onFormSubmit: (joinProjectRequest: JoinProjectRequest) => void;
};


const JoinProjectForm = ({isPending, onFormSubmit}: JoinProjectFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<JoinProjectFormData>({
        resolver: zodResolver(joinProjectFormSchema)
    });

    return (
        <Flex align={"start"}>
            <form onSubmit={handleSubmit(onFormSubmit)} autoComplete="off" noValidate>
                <Center borderRadius={"md"} p={6} width={"25vw"}>
                    <FieldsetRoot size={"lg"} maxW={"md"}>
                        <FieldsetLegend textAlign={"center"} fontSize={"xl"}>
                            ПРИСОЕДИНИТЬСЯ К ПРОЕКТУ
                        </FieldsetLegend>

                        <FieldsetContent>
                            <Field required invalid={!!errors.accessCode}>
                                <Input id="accessCode" type="text" placeholder="Код доступа" {...register("accessCode")} />
                                <FieldErrorText>
                                    {errors.accessCode?.message}
                                </FieldErrorText>
                            </Field>
                        </FieldsetContent>

                        <Button type="submit" disabled={isPending}>
                            Присоединиться
                        </Button>
                    </FieldsetRoot>
                </Center>
            </form>
		</Flex>
    );
};

export default JoinProjectForm;