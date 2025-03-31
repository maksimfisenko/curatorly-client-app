import publicApi from "@/config/api-client";
import { CreateProjectRequest } from "@/models";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useCreateProject = () => {
    return useMutation<void, AxiosError, CreateProjectRequest>({
        mutationKey: ["create-project"],
        mutationFn: (createProjectRequest: CreateProjectRequest) => publicApi.post("/api/v1/projects", createProjectRequest)
    });
};

export { useCreateProject };