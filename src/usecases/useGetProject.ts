import publicApi from "@/config/api-client";
import { GetProjectResponse } from "@/models";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import camelcaseKeys from "camelcase-keys";

const useGetProject = (projectID: string) => {
    return useQuery<GetProjectResponse, AxiosError>({
        queryKey: ["get-project", projectID],
        queryFn: (() => publicApi.get(`/api/v1/projects/${projectID}`)
            .then(response => camelcaseKeys(response.data, { deep: true })))
    });
};

export { useGetProject };