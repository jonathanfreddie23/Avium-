import { put, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import Actions from 'redux/Actions';

import HomeGateway from 'api/Home';
import { GatewayResponseStatus } from 'api/types/types';
import { ReferralKeyActionPayload } from 'redux/slices/home/types';
import Utils from 'lib/Utils';

export default function* watchGetReferralKey(api: HomeGateway): SagaWatcherReturnType {
    yield takeEvery('home/homeReferralKeyAttempt', handleGetReferralKey, api);
}

function* handleGetReferralKey(api: HomeGateway, data: ReferralKeyActionPayload) {
    const { id, recaptchaValue } = data.payload;

    if (!recaptchaValue) {
        yield put(Actions.homeReferralKeyFailure('Please validate the captcha first.'));
        return;
    }

    const response = yield* call([api, api.getReferralKey], { id, recaptchaValue });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.homeReferralKeyFailure(response.message));
        return;
    }

    sessionStorage.setItem('submissionIdStore', response.data.submissionId);

    yield put(Actions.homeReferralKeySuccess(response.data));
    yield put(Actions.uiSetHomeStage(2));
    Utils.Linking.clearLinkingStatus();
}
