import { AxiosInstance } from 'axios';
import { IUserAvatarItem } from '../types/backend';
import { BaseHttpController } from './BaseHttpController';

export class UserAvatarItemController extends BaseHttpController<IUserAvatarItem> {
    constructor(serviceURL: AxiosInstance) {
        super(serviceURL, 'user-avatar-item');
    }
}
