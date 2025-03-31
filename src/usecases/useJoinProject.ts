import publicApi from "@/config/api-client";
import { AxiosErrorResponseData, JoinProjectRequest } from "@/models";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useJoinProject = () => {
    return useMutation<void, AxiosError<AxiosErrorResponseData>, JoinProjectRequest>({
        mutationKey: ["join-project"],
        mutationFn: (joinProjectRequest: JoinProjectRequest) => publicApi.post("/api/v1/add-users", joinProjectRequest)
    });
};

export { useJoinProject };