import CreateProjectForm from "@/components/CreateProjectForm";
import Header from "@/components/Header";
import JoinProjectForm from "@/components/JoinProjectForm";
import ProjectsList from "@/components/ProjectsList";
import { Toaster, toaster } from "@/components/ui/toaster";
import { AxiosErrorResponseData, CreateProjectRequest, JoinProjectRequest } from "@/models";
import { useCreateProject } from "@/usecases/useCreateProject";
import { useGetCurrentUser } from "@/usecases/useGetCurrentUser";
import { useGetUserProjects } from "@/usecases/useGetUserProjects";
import { useJoinProject } from "@/usecases/useJoinProject";
import { Flex, Heading, Separator } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Link } from "react-router";

const ProjectsPage = () => {
    const queryClient = useQueryClient();
    const { data } = useGetUserProjects();

    const { 
        mutate: mutateCreateProject, 
        isPending: isPendingCreateProject 
    } = useCreateProject();

    const { 
        mutate: mutateJoinProject,
        isPending: isPendingJoinProject,
    } = useJoinProject();

    const { 
        data: userData
    } = useGetCurrentUser();

    if (userData?.user.email === "") {
        return (
            <Flex w="100%" h="100vh" align="center" justify="center">
                <Heading>Чтобы просмотреть содержимое данной страницы, необходимо <Link to={"/login"}>войти в аккаунт</Link></Heading>
            </Flex>
        );
    }

    const handleCreateProject = (createProjectRequest: CreateProjectRequest) => {
        console.log("create project request", createProjectRequest);

        mutateCreateProject(createProjectRequest, {
            onSuccess: () => {
                toaster.create({
                    type: "success",
                    title: "Создан новый проект"
                });

                queryClient.invalidateQueries({ queryKey: ["get-user-projects"] });
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

    const handleJoinProject = (joinProjectRequest: JoinProjectRequest) => {
        console.log("join project request", joinProjectRequest);

        mutateJoinProject(joinProjectRequest, {
            onSuccess: () => {
                toaster.create({
                    type: "success",
                    title: "Вы присоединились к проекту"
                });

                queryClient.invalidateQueries({ queryKey: ["get-user-projects"] });
            },
            onError: (error: AxiosError<AxiosErrorResponseData>) => {
                const errorMessage = 
                    error.response?.data?.error.user || 
                    error.response?.data?.error.project || 
                    "Произошла ошибка. Пожалуйста, повторите попытку позже";

                toaster.create({
                    type: "error",
                    title: "Ошибка",
                    description: errorMessage
                });
            }
        });
    };

    return (
        <Flex w={"100%"} flexDirection={"column"}>
            <Header userName={userData?.user.name ?? ""} userSurname={userData?.user.surname ?? " "} />
            <Flex flexDirection={"row"}>
                <Flex flex={0.2} flexDirection={"column"} justifyContent={"flex-start"} m={5}>
                    <CreateProjectForm isPending={isPendingCreateProject} onFormSubmit={handleCreateProject} />
                    <Separator />
                    <JoinProjectForm isPending={isPendingJoinProject} onFormSubmit={handleJoinProject} />
                </Flex>
                <ProjectsList projects={data?.projects ?? []} />
                <Toaster />
            </Flex>
        </Flex>
    );
};

export default ProjectsPage;