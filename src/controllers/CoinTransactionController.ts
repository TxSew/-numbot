import { AxiosInstance } from 'axios';
import { ICoinTransaction } from '../types/backend';
import { BaseHttpController } from './BaseHttpController';

export class CoinTransactionController extends BaseHttpController<ICoinTransaction> {
    constructor(serviceURL: AxiosInstance) {
        super(serviceURL, 'coin-transaction');
    }
}
