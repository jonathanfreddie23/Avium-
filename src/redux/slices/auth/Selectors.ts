import { AuthState } from '.';

const getLoginAttempting = (state: AuthState): boolean => state.actions.login || false;
const getLoginError = (state: AuthState): string => state.error.login || '';

const getAuthToken = (state: AuthState): string => state.authToken || '';

export default {
    getLoginAttempting,
    getLoginError,

    getAuthToken,
};
