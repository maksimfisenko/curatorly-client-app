import publicApi from "@/config/api-client";
import { CreateCourseRequest } from "@/models";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useCreateCourse = () => {
    return useMutation<void, AxiosError, CreateCourseRequest>({
        mutationKey: ["create-course"],
        mutationFn: (createCourseRequest: CreateCourseRequest) => publicApi.post("/api/v1/courses", createCourseRequest)
    });
};

export { useCreateCourse };