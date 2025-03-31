import publicApi from "@/config/api-client";
import { GetUserProjectsResponse } from "@/models";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import camelcaseKeys from "camelcase-keys";

const useGetUserProjects = () => {
    return useQuery<GetUserProjectsResponse, AxiosError>({
        queryKey: ["get-user-projects"],
        queryFn: () => publicApi.get("/api/v1/projects")
            .then(response => camelcaseKeys(response.data, { deep: true }))
    });
};

export { useGetUserProjects };