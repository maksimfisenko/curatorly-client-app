import publicApi from "@/config/api-client";
import { AccessToken, LoginRequest } from "@/models";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useLogin = () => {
    return useMutation<AccessToken, AxiosError, LoginRequest>({
        mutationKey: ["login"],
        mutationFn: (loginRequest: LoginRequest) => publicApi.post<AccessToken>("/api/v1/users/login", loginRequest)
            .then(response => response.data)
    });
};

export { useLogin };