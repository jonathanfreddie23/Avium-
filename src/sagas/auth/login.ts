import { put, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import AuthGateway from 'api/Auth';

import Actions from 'redux/Actions';
import NavActions from 'lib/NavActions';
import { LoginActionPayload } from 'redux/slices/auth/types';
import { GatewayResponseStatus } from 'api/types/types';

export default function* watchLogin(api: AuthGateway): SagaWatcherReturnType {
    yield takeEvery('auth/authLoginAttempt', handleLogin, api);
}

function* handleLogin(api: AuthGateway, data: LoginActionPayload) {
    const { username, password } = data.payload;

    if (!username || !password) {
        yield put(Actions.authLoginFailure('Please enter your username and password'));
        return;
    }

    const response = yield* call([api, api.login], { email: username, password });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.authLoginFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.authLoginSuccess(''));

        NavActions.navToHome();
    }
}
