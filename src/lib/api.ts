import axios, { type AxiosRequestConfig } from "axios";

// Create a single axios instance
const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com", // example placeholder API
    headers: {
        "Content-Type": "application/json",
    },
});

// Generic request function
async function request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await api.request<T>(config);
    return response.data;
}

// CRUD helpers
export const apiClient = {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
        request<T>({ url, method: "GET", ...config }),

    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        request<T>({ url, method: "POST", data, ...config }),

    put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        request<T>({ url, method: "PUT", data, ...config }),

    patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        request<T>({ url, method: "PATCH", data, ...config }),

    delete: <T>(url: string, config?: AxiosRequestConfig) =>
        request<T>({ url, method: "DELETE", ...config }),
};
