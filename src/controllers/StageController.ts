import { AxiosInstance } from 'axios';
import { IStage, IStageController, ListStageResponse, StageRequestDto } from '../types/backend';
import { BaseHttpController } from './BaseHttpController';

export class StageController extends BaseHttpController<IStage> implements IStageController {
    constructor(serviceURL: AxiosInstance) {
        super(serviceURL, 'stage');
    }

    async listStageByOrganizationUserId(organizationUserId: number): Promise<ListStageResponse[]> {
        return this.doGet({ path: String(organizationUserId) }).then((res) => res.data);
    }
    async getStageById(props: StageRequestDto): Promise<any> {
        return this.doPost({ path: `levels`, body: props }).then((res) => res.data);
    }
}
