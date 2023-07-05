import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginActionPayload, AuthReduxState } from './types';

const initialState: AuthReduxState = {
    actions: {
        login: false,
        startup: true,
    },
    authToken: '',
    error: {
        login: '',
        startup: '',
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLoginAttempt: (state, _action: LoginActionPayload) => {
            state.actions.login = true;
            state.error.login = '';
        },
        authLoginSuccess: (state, action: PayloadAction<string>) => {
            state.actions.login = false;
            state.authToken = action.payload;
        },
        authLoginFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.login = false;
            if (action.payload) {
                state.error.login = action.payload;
            }
        },
    },
});

export type AuthState = typeof initialState;

export default {
    actions: authSlice.actions,
    reducers: authSlice.reducer,
};
