import { fork } from 'redux-saga/effects';
import HomeGateway from 'api/Home';

import { RootSagaReturnType } from 'sagas/types';

import watchGetReferralKey from './getReferralKey';
import watchGetDiscordLinking from './linkingDiscord';
import watchGetTwitterLink from './getTwitterLink';
import watchLinkTwitter from './linkingTwitter';
import watchGetRoleSelect from './roleSelect';
import watchGetAnswerSubmission from './answerSubmission';
import watchSubmitEmail from './submitEmail';

export default (api: HomeGateway): RootSagaReturnType => {
    function* rootSaga() {
        yield fork(watchGetReferralKey, api);
        yield fork(watchGetDiscordLinking, api);
        yield fork(watchGetTwitterLink, api);
        yield fork(watchLinkTwitter, api);
        yield fork(watchGetRoleSelect, api);
        yield fork(watchGetAnswerSubmission, api);
        yield fork(watchSubmitEmail, api);
    }

    return {
        rootSaga,
    };
};
