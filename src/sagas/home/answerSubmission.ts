import { put, call, takeEvery, select } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import HomeGateway from 'api/Home';
import { GatewayResponseStatus } from 'api/types/types';

import { AnswerActionPayload } from 'redux/slices/home/types';
import NavActions from 'lib/NavActions';
import Translate from 'lib/Translate';

import { QuestionTypeEnum } from 'entities/questions';

export default function* watchGethandleAnswerSubmission(api: HomeGateway): SagaWatcherReturnType {
    yield takeEvery('home/homeAnswerAttempt', handleSubmission, api);
}

function* handleSubmission(api: HomeGateway, data: AnswerActionPayload) {
    const { index, answer, answerFile, questionType, isLastQuestion } = data.payload;

    const submissionId = sessionStorage.getItem('submissionIdStore');
    const counter = yield* select(Selectors.homeSetCounterData);

    if (!submissionId) {
        yield put(Actions.homeAnswerFailure('Something went wrong. Please try again.'));
        NavActions.navToHome();
        return;
    }

    if (questionType === QuestionTypeEnum.None) {
        yield put(Actions.setCounter(counter + 1));
        yield put(Actions.homeAnswerSuccess({
            index,
            answer: '',
        }));
        return;
    }

    if (!answer || !answer.length || answer.trim().length === 0) {
        yield put(Actions.homeAnswerFailure(Translate.t('Question.emptyError')));
        return;
    }

    if (!answerFile) {
        // text answer only
        const response = yield* call([api, api.answerSubmission], { id: submissionId, questionIndex: index, answer });

        if (response.status === GatewayResponseStatus.Error) {
            yield put(Actions.homeAnswerFailure(response.message));

            return;
        }

        if (isLastQuestion) {
            const confirmationResponse = yield* call([api, api.answerSubmissionConfirmation], { id: submissionId });

            if (confirmationResponse.status === GatewayResponseStatus.Error) {
                yield put(Actions.homeAnswerFailure(confirmationResponse.message));
                return;
            }

            yield put(Actions.homeAnswerSuccess({
                index,
                answer,
            }));
            NavActions.navToEmail();
        } else {
            yield put(Actions.setCounter(counter + 1));

            yield put(Actions.homeAnswerSuccess({
                index,
                answer,
            }));
        }
    } else {
        // file answer
        const fileResponse = yield* call([api, api.answerFileSubmission], {
            id: submissionId,
            questionIndex: index,
            answer,
            file: answerFile,
        });

        if (fileResponse.status === GatewayResponseStatus.Error) {
            yield put(Actions.homeAnswerFailure(fileResponse.message));
            return;
        }

        if (isLastQuestion) {
            const confirmationResponse = yield* call([api, api.answerSubmissionConfirmation], { id: submissionId });

            if (confirmationResponse.status === GatewayResponseStatus.Error) {
                yield put(Actions.homeAnswerFailure(confirmationResponse.message));
                return;
            }

            yield put(Actions.homeAnswerSuccess({
                index,
                answer,
            }));
            NavActions.navToEmail();
        } else {
            yield put(Actions.homeAnswerSuccess({
                index,
                answer,
                fileName: answerFile.name,
            }));

            yield put(Actions.setCounter(counter + 1));
        }
    }
}
