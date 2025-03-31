import publicApi from "@/config/api-client";
import { GetProjectCoursesResponse } from "@/models";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import camelcaseKeys from "camelcase-keys";

const useGetProjectCourses = (projectID: string) => {
    return useQuery<GetProjectCoursesResponse, AxiosError>({
        queryKey: ["get-project-courses", projectID],
        queryFn: () => publicApi.get(`/api/v1/projects/${projectID}/courses`)
            .then(response => camelcaseKeys(response.data, { deep: true }))
    });
};

export { useGetProjectCourses };