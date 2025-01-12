import { AxiosInstance } from 'axios';
import { IOrganizationUser, IOrganizationUserController } from '../types/backend';
import { BaseHttpController } from './BaseHttpController';

export class OrganizationUserController
    extends BaseHttpController<IOrganizationUser>
    implements IOrganizationUserController
{
    constructor(serviceURL: AxiosInstance) {
        super(serviceURL, 'organization-user');
    }
    async getPlayesByUser(organizationId: number): Promise<IOrganizationUser[]> {
        return this.doGet({ path: `members/${organizationId}` }).then((res) => res.data);
    }
}
