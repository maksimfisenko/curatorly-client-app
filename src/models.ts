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
    token: string;
}

export interface HealthcheckResponse {
    status: string;
    systemInfo: {
        environment: string;
        version: string;
    };
}