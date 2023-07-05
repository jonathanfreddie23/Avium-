import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnswerActionPayload, AnswerInput, DiscordActionPayload, HomeReduxState, ReferralKeyActionPayload, ReferralKeyResponse, RoleSelectActionPayload, SubmitEmailPayload, TwitterActionPayload } from './types';

const initialState: HomeReduxState = {
    actions: {
        referralKey: false,
        discordState: false,
        twitter: false,
        roleSelect: false,
        answer: false,
        email: false,
    },
    referralKeyId: null,
    cancel: false,
    discordSuccess: null,
    roleSelectSuccess: null,
    roleNumber: null,
    answerSuccess: '',
    answers: [],
    counter: 1,
    selectedLanguage: '',
    error: {
        referralKey: '',
        discordState: '',
        twitter: '',
        roleSelect: '',
        answer: '',
        email: '',

    },
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {

        setLoader: (state, action: PayloadAction<boolean>) => {
            state.cancel = action.payload;
        },

        homeReferralKeyAttempt: (state, _action: ReferralKeyActionPayload) => {
            state.actions.referralKey = true;
            state.error.referralKey = '';
        },
        homeReferralKeySuccess: (state, action: PayloadAction<ReferralKeyResponse | null>) => {
            state.actions.referralKey = false;
            state.referralKeyId = action.payload;
        },
        homeReferralKeyFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.referralKey = false;
            if (action.payload) {
                state.error.referralKey = action.payload;
            }
        },

        resetHomeReferralKeyAttempt: (state, _action: PayloadAction<boolean>) => {
            state.actions.referralKey = false;
        },

        resetHomeReferralKeyFail: (state, _action: PayloadAction<string>) => {
            state.error.referralKey = '';
        },

        resetHomeReferralKeyAttemptSuccess: (state, action: PayloadAction<null>) => {
            state.referralKeyId = action.payload;
        },

        homeDiscordAuthAttempt: (state, _action: DiscordActionPayload) => {
            state.actions.discordState = true;
            state.error.discordState = '';
        },
        homeDiscordAuthSuccess: (state, action: PayloadAction<null>) => {
            state.actions.discordState = false;
            state.discordSuccess = action.payload;
        },
        homeDiscordAuthFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.discordState = false;
            if (action.payload) {
                state.error.discordState = action.payload;
            }
        },

        homeTwitterGetLinkAttempt: (state) => {
            state.actions.twitter = true;
        },
        homeTwitterGetLinkSuccess: (state) => {
            state.actions.twitter = false;
        },
        homeTwitterGetLinkFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.twitter = false;
            if (action.payload) {
                state.error.twitter = action.payload;
            }
        },
        homeTwitterLinkAttempt: (state, _action: TwitterActionPayload) => {
            state.actions.twitter = true;
            state.error.twitter = '';
        },
        homeTwitterLinkSuccess: (state) => {
            state.actions.twitter = false;
        },
        homeTwitterLinkFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.twitter = false;
            if (action.payload) {
                state.error.twitter = action.payload;
            }
        },

        homeRoleSelectAttempt: (state, _action: RoleSelectActionPayload) => {
            state.actions.roleSelect = true;
            state.error.roleSelect = '';
        },
        homeRoleSelectSuccess: (state, action: PayloadAction<null>) => {
            state.actions.roleSelect = false;
            state.roleSelectSuccess = action.payload;
        },
        homeRoleSelectFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.roleSelect = false;
            if (action.payload) {
                state.error.roleSelect = action.payload;
            }
        },

        homeRoleEnum: (state, action: PayloadAction<number | null>) => {
            state.roleNumber = action.payload;
        },

        homeAnswerAttempt: (state, _action: AnswerActionPayload) => {
            state.actions.answer = true;
            state.error.answer = '';
        },
        homeAnswerSuccess: (state, action: PayloadAction<AnswerInput>) => {
            state.actions.answer = false;

            const answerIndex = state.answers.findIndex((item) => item.index === action.payload.index);

            if (answerIndex < 0) state.answers = (state.answers || []).concat(action.payload);
            else {
                state.answers = state.answers.map((item, index) => {
                    if (index === answerIndex) return action.payload;
                    return item;
                });
            }
        },
        homeAnswerFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.answer = false;
            if (action.payload) {
                state.error.answer = action.payload;
            }
        },
        homeClearAnswers: (state) => {
            state.answers = [];
        },
        setCounter: (state, action: PayloadAction<number>) => {
            state.counter = action.payload;
        },

        homeSubmitEmailAttempt: (state, _action: SubmitEmailPayload) => {
            state.actions.email = true;
            state.error.email = '';
        },
        homeSubmitEmailSuccess: (state) => {
            state.actions.email = false;
        },
        homeSubmitEmailFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.email = false;

            if (action.payload) {
                state.error.email = action.payload;
            }
        },

        setLanguage: (state, action: PayloadAction<string>) => {
            state.selectedLanguage = action.payload;
        },

    },
});

export type HomeState = typeof initialState;

export default {
    actions: homeSlice.actions,
    reducers: homeSlice.reducer,
};
