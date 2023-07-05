import { fork } from 'redux-saga/effects';

import AuthGateway from 'api/Auth';
import { RootSagaReturnType } from 'sagas/types';

import watchLogin from './login';

export default (api: AuthGateway): RootSagaReturnType => {
    function* rootSaga() {
        yield fork(watchLogin, api);
    }

    return {
        rootSaga,
    };
};
