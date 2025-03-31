import Header from "@/components/Header";
import CreateCourseForm from "@/components/CreateCourseForm";
import { Toaster, toaster } from "@/components/ui/toaster";
import { CreateCourseRequest } from "@/models";
import { useCreateCourse } from "@/usecases/useCreateCourse";
import { useGetCurrentUser } from "@/usecases/useGetCurrentUser";
import { Flex, Heading } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import CoursesList from "@/components/CoursesList";
import { useGetProjectCourses } from "@/usecases/useGetProjectCourses";
import { useGetProject } from "@/usecases/useGetProject";

const CoursesPage = () => {
    const queryClient = useQueryClient();

    const { projectID } = useParams<{ projectID: string }>();

    const { data: userData } = useGetCurrentUser();
    const { data: projectData } = useGetProject(projectID ?? "0");
    const { data: coursesData } = useGetProjectCourses(projectID ?? "0");
    const { mutate: mutateCreateCourse, isPending: isPendingCreateCourse } = useCreateCourse(projectID ?? "0");

    if (userData?.user.email === "") {
        return (
            <Flex w="100%" h="100vh" align="center" justify="center">
                <Heading>Чтобы просмотреть содержимое данной страницы, необходимо <Link to={"/login"}>войти в аккаунт</Link></Heading>
            </Flex>
        );
    }

    const handleCreateCourse = (createCourseRequest: CreateCourseRequest) => {
        console.log("create course request", createCourseRequest);

        mutateCreateCourse(createCourseRequest, {
            onSuccess: () => {
                toaster.create({
                    type: "success",
                    title: "Создан новый курс"
                });

                queryClient.invalidateQueries({ queryKey: ["get-project-courses"] });
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

    console.log(projectData)

    return (
        <Flex w={"100%"} flexDirection={"column"}>
            <Header userName={userData?.user.name ?? ""} userSurname={userData?.user.surname ?? " "} />
            <Heading alignSelf={"center"} m={5} size={"3xl"}>{projectData?.project.title.toUpperCase()}</Heading>
            <Flex flexDirection={"row"}>
                <Flex flex={0.2} flexDirection={"column"} justifyContent={"flex-start"} m={5}>
                    <CreateCourseForm isPending={isPendingCreateCourse} onFormSubmit={handleCreateCourse} />
                </Flex>
                <CoursesList courses={coursesData?.courses ?? []} />
                <Toaster />
            </Flex>
        </Flex>
    );
};

export default CoursesPage;