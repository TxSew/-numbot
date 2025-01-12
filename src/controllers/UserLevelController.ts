import { AxiosInstance } from 'axios';
import { IUserLevel } from '../types/backend';
import { BaseHttpController } from './BaseHttpController';

export class UserLevelController extends BaseHttpController<IUserLevel> {
    constructor(serviceURL: AxiosInstance) {
        super(serviceURL, 'user-level');
    }
}
