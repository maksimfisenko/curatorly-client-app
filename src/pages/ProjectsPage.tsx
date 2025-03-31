import CreateProjectForm from "@/components/CreateProjectForm";
import JoinProjectForm from "@/components/JoinProjectForm";
import ProjectsList from "@/components/ProjectsList";
import { Toaster, toaster } from "@/components/ui/toaster";
import { CreateProjectRequest, JoinProjectRequest } from "@/models";
import { useCreateProject } from "@/usecases/useCreateProject";
import { useGetUserProjects } from "@/usecases/useGetUserProjects";
import { useJoinProject } from "@/usecases/useJoinProject";
import { Box, Flex, Separator } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";

const ProjectsPage = () => {
    const queryClient = useQueryClient();
    const { data } = useGetUserProjects();
    const { mutate: mutateCreateProject, isPending: isPendingCreateProject } = useCreateProject();
    const { mutate: mutateJoinProject, isPending: isPendingJoinProject } = useJoinProject();

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
        <Box width={"100%"} display={"flex"} flexDirection={"row"}>
            <Flex flex={0.2} flexDirection={"column"} justifyContent={"flex-start"} m={5}>
                <CreateProjectForm isPending={isPendingCreateProject} onFormSubmit={handleCreateProject} />
                <Separator />
                <JoinProjectForm isPending={isPendingJoinProject} onFormSubmit={handleJoinProject} />
            </Flex>
            <ProjectsList projects={data?.projects ?? []} />
            <Toaster />
        </Box>
    );
};

export default ProjectsPage;