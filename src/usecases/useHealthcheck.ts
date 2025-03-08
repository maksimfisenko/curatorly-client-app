import publicApi from "@/config/api-client";
import { HealthcheckResponse } from "@/models";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import camelcaseKeys from "camelcase-keys";

const useHealthcheck = () => {
    return useQuery<HealthcheckResponse, AxiosError>({
        queryKey: ["healthcheck"],
        queryFn: () => publicApi.get("/api/v1/healthcheck")
            .then(response => camelcaseKeys(response.data, { deep: true }))
    });
};

export { useHealthcheck };