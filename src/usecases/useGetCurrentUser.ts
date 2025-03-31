import publicApi from "@/config/api-client";
import { User } from "@/models";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import camelcaseKeys from "camelcase-keys";

const useGetCurrentUser = () => {
    return useQuery<User, AxiosError>({
        queryKey: ["get-current-user"],
        queryFn: () => publicApi.get("/api/v1/users/current")
            .then(response => camelcaseKeys(response.data, { deep: true }))
    });
};

export { useGetCurrentUser };