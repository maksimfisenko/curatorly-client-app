import publicApi from "@/config/api-client";
import { CreateCourseRequest } from "@/models";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useCreateCourse = (projectID: string) => {
    return useMutation<void, AxiosError, CreateCourseRequest>({
        mutationKey: ["create-course", projectID],
        mutationFn: (createCourseRequest: CreateCourseRequest) => publicApi.post(`/api/v1/projects/${projectID}/courses`, createCourseRequest)
    });
};

export { useCreateCourse };