import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from '../types/ApiError';

export class BaseHttpController<T = any, ID = number | string> {
    protected readonly client: AxiosInstance;
    private readonly basePath: string;

    constructor(client: AxiosInstance, basePath: string) {
        this.client = client;
        this.basePath = basePath;
    }

    protected handleApiError(error: unknown): never {
        if (axios.isAxiosError(error) && error.response && error.response.data) {
            const apiError: ApiError = {
                message: error.response.data.message || 'An unexpected error occurred.',
                error: error.response.data.error || 'Unknown Error',
                statusCode: error.response.data.statusCode || 500,
            };
            throw apiError;
        } else {
            throw {
                message: 'An unexpected error occurred.',
                error: 'Unknown Error',
                statusCode: 500,
            } as ApiError;
        }
    }

    async findAll(config?: AxiosRequestConfig): Promise<T[]> {
        try {
            const response = await this.doGet({ path: '', config });
            return response.data;
        } catch (error: unknown) {
            this.handleApiError(error);
        }
    }

    async findById(id: ID, config?: AxiosRequestConfig): Promise<T | null> {
        try {
            const response = await this.doGet({ path: `${id}`, config });
            return response.data;
        } catch (error: unknown) {
            this.handleApiError(error);
        }
    }

    async create(data: Partial<T>, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.doPost({ path: '', body: data, config });
            return response.data;
        } catch (error: unknown) {
            this.handleApiError(error);
        }
    }

    async update(id: ID, data: Partial<T>, config?: AxiosRequestConfig): Promise<void> {
        try {
            await this.doPut({ path: `${id}`, body: data, config });
        } catch (error: unknown) {
            this.handleApiError(error);
        }
    }

    async upsert(data: Partial<T>, config?: AxiosRequestConfig): Promise<void> {
        try {
            await this.doPost({ path: `upsert`, body: data, config });
        } catch (error: unknown) {
            this.handleApiError(error);
        }
    }

    async delete(id: ID, config?: AxiosRequestConfig): Promise<void> {
        try {
            await this.doDelete({ path: `${id}`, config });
        } catch (error: unknown) {
            this.handleApiError(error);
        }
    }

    // Base HTTP methods
    async doGet({ path, config }: { path: string; config?: AxiosRequestConfig }): Promise<AxiosResponse> {
        try {
            return await this.client.get(`${this.basePath}/${path}`, config);
        } catch (error: unknown) {
            this.handleApiError(error);
        }
    }

    async doPost({
        path,
        body,
        config,
    }: {
        path: string;
        body?: any;
        config?: AxiosRequestConfig;
    }): Promise<AxiosResponse> {
        try {
            return await this.client.post(`${this.basePath}/${path}`, body, config);
        } catch (error: unknown) {
            this.handleApiError(error);
        }
    }

    async doPut({
        path,
        body,
        config,
    }: {
        path: string;
        body?: any;
        config?: AxiosRequestConfig;
    }): Promise<AxiosResponse> {
        try {
            return await this.client.put(`${this.basePath}/${path}`, body, config);
        } catch (error: unknown) {
            this.handleApiError(error);
        }
    }

    async doPatch({
        path,
        body,
        config,
    }: {
        path: string;
        body?: any;
        config?: AxiosRequestConfig;
    }): Promise<AxiosResponse> {
        try {
            return await this.client.patch(`${this.basePath}/${path}`, body, config);
        } catch (error: unknown) {
            this.handleApiError(error);
        }
    }

    async doDelete({ path, config }: { path: string; config?: AxiosRequestConfig }): Promise<AxiosResponse> {
        try {
            return await this.client.delete(`${this.basePath}/${path}`, config);
        } catch (error: unknown) {
            this.handleApiError(error);
        }
    }
}
