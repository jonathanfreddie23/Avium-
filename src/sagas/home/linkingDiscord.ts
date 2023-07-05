import { put, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import Actions from 'redux/Actions';

import HomeGateway from 'api/Home';
import { GatewayResponseStatus } from 'api/types/types';
import { DiscordActionPayload } from 'redux/slices/home/types';

import NavActions from 'lib/NavActions';
import Utils from 'lib/Utils';

export default function* watchGetDiscordLinking(api: HomeGateway): SagaWatcherReturnType {
    yield takeEvery('home/homeDiscordAuthAttempt', handleDiscordAuth, api);
}

function* handleDiscordAuth(api: HomeGateway, data: DiscordActionPayload) {
    const { code } = data.payload;

    const submissionId = sessionStorage.getItem('submissionIdStore');

    if (!submissionId) {
        yield put(Actions.homeDiscordAuthFailure('Invalid submission. Please try again.'));
        NavActions.navToHome();

        return;
    }

    const response = yield* call([api, api.linkingDiscord], { code, submissionId });

    if (response.status === GatewayResponseStatus.Error) {
        const { name: errorCode } = response;

        if (errorCode === '1107') {
            NavActions.navToAlreadySubmitted();
            yield put(Actions.homeDiscordAuthFailure(''));
            return;
        }

        if (errorCode === '1110') {
            NavActions.navToAlreadyApproved();
            yield put(Actions.homeDiscordAuthFailure(''));
            return;
        }

        yield put(Actions.homeDiscordAuthFailure(response.message));
        return;
    }

    yield put(Actions.homeDiscordAuthSuccess(response.data));

    Utils.Linking.setDiscordLinked();

    const status = Utils.Linking.getLinkingStatus();

    if (status.discord && status.twitter) {
        NavActions.navToSelectRole();
    } else {
        yield put(Actions.uiSetHomeStage(3));
        NavActions.navToHome();
    }
}
