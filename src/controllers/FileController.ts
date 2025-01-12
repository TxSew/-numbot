import { AxiosInstance } from 'axios';
import { BaseHttpController } from './BaseHttpController';

export class FileController extends BaseHttpController<any> {
    constructor(client: AxiosInstance) {
        super(client, 'files');
    }
    async upload(file: File): Promise<{ fileName: string; fileUrl: string; message: string }> {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await this.client.post<{ fileName: string; fileUrl: string; message: string }>(
                `upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data;
        } catch (error) {
            this.handleApiError(error);
        }
    }

    async deleteFile(fileName: string): Promise<{ message: string }> {
        try {
            const response = await this.client.delete<{ message: string }>(`delete/${fileName}`);
            return response.data;
        } catch (error) {
            this.handleApiError(error);
        }
    }

    async getUploadedImages(): Promise<{ fileName: string; fileUrl: string }[]> {
        try {
            const response = await this.client.get<{ fileName: string; fileUrl: string }[]>(`list`);
            return response.data;
        } catch (error) {
            this.handleApiError(error);
        }
    }
}
