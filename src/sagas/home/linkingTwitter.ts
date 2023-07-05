import { put, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import Actions from 'redux/Actions';

import HomeGateway from 'api/Home';
import { GatewayResponseStatus } from 'api/types/types';
import { TwitterActionPayload } from 'redux/slices/home/types';
import NavActions from 'lib/NavActions';
import Utils from 'lib/Utils';
import Translate from 'lib/Translate';

export default function* watchGetTwitterLinking(api: HomeGateway): SagaWatcherReturnType {
    yield takeEvery('home/homeTwitterLinkAttempt', handleTwitterLink, api);
}

function* handleTwitterLink(api: HomeGateway, data: TwitterActionPayload) {
    const { token, verifier } = data.payload;

    const submissionId = sessionStorage.getItem('submissionIdStore');

    if (!submissionId) {
        yield put(Actions.homeTwitterGetLinkFailure(Translate.t('Home.somethingWrong')));
        NavActions.navToHome();

        return;
    }

    const secret = Utils.Linking.getTwitterData();
    const { oauthTokenSecret } = secret;

    if (!oauthTokenSecret) {
        yield put(Actions.homeTwitterLinkFailure(Translate.t('Home.somethingWrong')));
        return;
    }

    const response = yield* call([api, api.linkingTwitter], {
        submissionId,
        oauthToken: token,
        oauthTokenSecret,
        oauthVerifier: verifier,
    });

    if (response.status === GatewayResponseStatus.Error) {
        const { name: errorCode } = response;

        if (errorCode === '1108') {
            NavActions.navToAlreadySubmitted();
            yield put(Actions.homeDiscordAuthFailure(''));
            return;
        }

        if (errorCode === '1110') {
            NavActions.navToAlreadyApproved();
            yield put(Actions.homeDiscordAuthFailure(''));
            return;
        }

        yield put(Actions.homeTwitterGetLinkFailure(response.message));
        return;
    }

    yield put(Actions.homeTwitterGetLinkSuccess());
    Utils.Linking.setTwitterLinked();

    const status = Utils.Linking.getLinkingStatus();

    if (status.discord && status.twitter) {
        NavActions.navToSelectRole();
    } else {
        yield put(Actions.uiSetHomeStage(3));
        NavActions.navToHome();
    }
}
