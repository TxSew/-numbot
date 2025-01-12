import { AxiosInstance } from 'axios';
import { BulkStoreAvatarDto, IAvatar, IAvatarController } from '../types/backend';
import { BaseHttpController } from './BaseHttpController';

export class AvatarController extends BaseHttpController<IAvatar> implements IAvatarController {
    constructor(serviceURL: AxiosInstance) {
        super(serviceURL, 'botbuilder');
    }

    async getAvatars(userId: number): Promise<IAvatar[]> {
        return await this.doGet({ path: `parts/${userId}` }).then((res) => res.data);
    }

    async bulkStoreAvatar(userId: number, props: BulkStoreAvatarDto): Promise<Boolean> {
        return await this.doPost({ path: `bulkstore/${userId}`, body: props }).then((res) => res.data);
    }
}
