import { put, call, takeEvery } from 'typed-redux-saga/macro';

import HomeGateway from 'api/Home';
import { GatewayResponseStatus } from 'api/types/types';

import Actions from 'redux/Actions';
import { SubmitEmailPayload } from 'redux/slices/home/types';
import { SagaWatcherReturnType } from 'sagas/types';
import NavActions from 'lib/NavActions';

export default function* watchSubmitEmail(api: HomeGateway): SagaWatcherReturnType {
    yield takeEvery('home/homeSubmitEmailAttempt', handleSubmitEmail, api);
}

function* handleSubmitEmail(api: HomeGateway, data: SubmitEmailPayload) {
    const { email } = data.payload;

    const submissionId = sessionStorage.getItem('submissionIdStore');

    if (!submissionId) {
        yield put(Actions.homeSubmitEmailFailure('Something went wrong. Please try again.'));
        return;
    }

    if (!email || !email.length) {
        yield put(Actions.homeSubmitEmailFailure('Please enter your email.'));
        return;
    }

    const response = yield* call([api, api.submitEmail], {
        id: submissionId,
        email,
    });

    if (response.status === GatewayResponseStatus.Error) {
        if (response.message === 'Validation error: "email" must be a valid email') {
            yield put(Actions.homeSubmitEmailFailure('Invalid email. Please enter a valid email address.'));
            return;
        }

        yield put(Actions.homeSubmitEmailFailure(response.message));
        return;
    }

    if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.homeSubmitEmailSuccess());
        yield put(Actions.homeClearAnswers());
        yield put(Actions.setCounter(1));
        sessionStorage.clear();
        NavActions.navToThankYou();
    }
}
