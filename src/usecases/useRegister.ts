import publicApi from "@/config/api-client";
import { RegisterRequest } from "@/models";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useRegister = () => {
    return useMutation<void, AxiosError, RegisterRequest>({
        mutationKey: ["register"],
        mutationFn: (registerRequest: RegisterRequest) => publicApi.post("/api/v1/users/register", registerRequest)
    });
};

export { useRegister };