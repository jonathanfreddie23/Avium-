import Gateway from 'api/types/Gateway';
import { GatewayResponse } from 'api/types/types';

export interface LoginParams {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export abstract class IAuthGateway extends Gateway {
    abstract login(params: LoginParams): GatewayResponse<LoginResponse | null>;
}
