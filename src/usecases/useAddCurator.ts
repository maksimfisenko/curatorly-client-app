import publicApi from "@/config/api-client";
import { AddCuratorRequest } from "@/models";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useAddCurator = (projectID: string) => {
    return useMutation<void, AxiosError, AddCuratorRequest>({
        mutationKey: ["add-curator", projectID],
        mutationFn: (addCuratorRequest: AddCuratorRequest) => publicApi.post(`/api/v1/projects/${projectID}/curators/add`, addCuratorRequest)
    });
};

export { useAddCurator };