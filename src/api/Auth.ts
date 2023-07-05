import { ApiResponse } from 'apisauce';

import { GatewayResponse } from 'api/types/types';

import { LoginParams, LoginResponse, IAuthGateway } from './AuthBase';

export default class AuthGateway extends IAuthGateway {
    async login(params: LoginParams): GatewayResponse<LoginResponse> {
        const response: ApiResponse<LoginResponse> = await this.api.post('auth/login', params);
        return this.process(response);
    }
}
