import { put, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import Actions from 'redux/Actions';

import HomeGateway from 'api/Home';
import { GatewayResponseStatus } from 'api/types/types';
import Utils from 'lib/Utils';

export default function* watchGetDiscordLinking(api: HomeGateway): SagaWatcherReturnType {
    yield takeEvery('home/homeTwitterGetLinkAttempt', handleGetTwitterLink, api);
}

function* handleGetTwitterLink(api: HomeGateway) {
    const response = yield* call([api, api.getTwitterLink]);

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.homeTwitterGetLinkFailure(response.message));
        return;
    }

    const { url, oauthTokenSecret } = response.data;

    yield put(Actions.homeTwitterGetLinkSuccess());

    Utils.Linking.setTwitterData({ oauthTokenSecret });
    window.open(url, '_self');
}
