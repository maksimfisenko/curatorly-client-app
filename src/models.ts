export interface RegisterRequest {
    name: string;
    surname: string;
    email: string;
    password: string;
};

export interface LoginRequest {
    email: string;
    password: string;
};

export interface AccessToken {
    authentication_token: string;
};

export interface HealthcheckResponse {
    status: string;
    systemInfo: {
        environment: string;
        version: string;
    };
};

export interface GetUserProjectsResponse {
    projects: {
        id: number;
        title: string;
        createdAt: string;
        creatorId: number;
        accessCode: string;
    }[];
};

export interface CreateProjectRequest {
    title: string;
};

export interface JoinProjectRequest {
    accessCode: string;
};

export interface AxiosErrorResponseData {
    error: {
        user?: string;
        project?: string;
    }
};

export interface User {
    user: {
        id: number;
        name: string;
        surname: string;
        email: string;
    }
};