import { put, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import Actions from 'redux/Actions';

import HomeGateway from 'api/Home';
import { GatewayResponseStatus } from 'api/types/types';
import { RoleSelectActionPayload } from 'redux/slices/home/types';
import NavActions from 'lib/NavActions';

export default function* watchGethandleRoleSelect(api: HomeGateway): SagaWatcherReturnType {
    yield takeEvery('home/homeRoleSelectAttempt', handleRoleSelect, api);
}

function* handleRoleSelect(api: HomeGateway, data: RoleSelectActionPayload) {
    const { roleSelected } = data.payload;

    const submissionId = sessionStorage.getItem('submissionIdStore');

    if (!submissionId) {
        yield put(Actions.homeRoleSelectFailure('Something went wrong. Please try again.'));
        return;
    }

    const response = yield* call([api, api.roleSelect], {
        id: submissionId,
        roleSelected,
    });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.homeRoleSelectFailure(response.message));
    }

    if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.homeRoleSelectSuccess(response.data));
        yield put(Actions.homeClearAnswers());
        NavActions.navToAnswer(data.payload.roleSelected);
    }
}
