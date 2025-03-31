import publicApi from "@/config/api-client";
import { JoinProjectRequest } from "@/models";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useJoinProject = () => {
    return useMutation<void, AxiosError, JoinProjectRequest>({
        mutationKey: ["join-project"],
        mutationFn: (joinProjectRequest: JoinProjectRequest) => publicApi.post("/api/v1/projects/add-user", joinProjectRequest)
    });
};

export { useJoinProject };