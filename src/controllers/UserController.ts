import { AxiosInstance } from 'axios';
import { IUser, IUserController, LoginDto } from '../types/backend';
import { BaseHttpController } from './BaseHttpController';

export class UserController extends BaseHttpController<IUser> implements IUserController {
    constructor(serviceURL: AxiosInstance) {
        super(serviceURL, 'user');
    }

    async sendOTP(data: { username: string }): Promise<void> {
        try {
            await this.doPost({ path: 'send-otp', body: data });
        } catch (error: unknown) {
            this.handleApiError(error);
        }
    }

    async login(data: LoginDto): Promise<{ token: string }> {
        try {
            const response = await this.doPost({ path: 'login', body: data });
            return response.data;
        } catch (error: unknown) {
            this.handleApiError(error);
        }
    }

    async logout(): Promise<void> {
        try {
            await this.doPost({ path: 'logout' });
        } catch (error: unknown) {
            this.handleApiError(error);
        }
    }

    async me(): Promise<IUser> {
        try {
            const response = await this.doGet({ path: 'me' });
            return response.data;
        } catch (error: unknown) {
            this.handleApiError(error);
        }
    }
}
