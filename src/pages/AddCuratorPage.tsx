import AddCuratorForm from "@/components/AddCuratorForm";
import Header from "@/components/Header";
import { Toaster, toaster } from "@/components/ui/toaster";
import { AddCuratorRequest } from "@/models";
import { useAddCurator } from "@/usecases/useAddCurator";
import { useGetCurrentUser } from "@/usecases/useGetCurrentUser";
import { useGetProject } from "@/usecases/useGetProject";
import { Breadcrumb, BreadcrumbCurrentLink, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbRoot, BreadcrumbSeparator, Flex, Heading } from "@chakra-ui/react";
import { Link, useParams } from "react-router";

const AddCuratorPage = () => {
    const { projectID } = useParams<{ projectID: string }>();

    const { data: projectData } = useGetProject(projectID ?? "0");
    const { data: userData } = useGetCurrentUser();
    const { mutate: mutateAddCurator, isPending: isPendingAddCurator } = useAddCurator(projectID ?? "0");

    if (userData?.user.email === "") {
        return (
            <Flex w="100%" h="100vh" align="center" justify="center">
                <Heading>Чтобы просмотреть содержимое данной страницы, необходимо <Link to={"/login"}>войти в аккаунт</Link></Heading>
            </Flex>
        );
    }

    const handleAddCurator = (addCuratorRequest: AddCuratorRequest) => {
        console.log(addCuratorRequest);

        mutateAddCurator(addCuratorRequest, {
            onSuccess: () => {
                toaster.create({
                    type: "success",
                     title: "Куратор успешно добавлен"
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
        <Flex w={"100%"} flexDirection={"column"}>
            <Header userName={userData?.user.name ?? ""} userSurname={userData?.user.surname ?? " "} />
            <BreadcrumbRoot size={"lg"} variant={"plain"} p={3}>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/projects`}>Мои проекты</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/projects/${projectData?.project.id}/courses`}>{projectData?.project.title}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/projects/${projectData?.project.id}/curators`}>Кураторы</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbCurrentLink>Добавить куратора</BreadcrumbCurrentLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </BreadcrumbRoot>
            <AddCuratorForm isPending={isPendingAddCurator} onFormSubmit={handleAddCurator} />
            <Toaster />
        </Flex>
    );
};

export default AddCuratorPage;