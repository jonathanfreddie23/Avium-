import { PayloadAction } from '@reduxjs/toolkit';

export interface AuthReduxState {
    actions: {
        login: boolean;
        startup: boolean;
    },
    authToken: string;
    error: {
        login: string;
        startup: string;
    },
}

export type LoginActionPayload = PayloadAction<{
    username: string;
    password: string;
}>
