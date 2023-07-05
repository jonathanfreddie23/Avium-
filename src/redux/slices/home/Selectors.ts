import { HomeState } from '.';
import { AnswerInput, ReferralKeyResponse } from './types';

const setLoader = (state: HomeState): boolean => state.cancel || false;

const getReferralKeyAttempting = (state: HomeState): boolean => state.actions.referralKey || false;
const getReferralKeyError = (state: HomeState): string => state.error.referralKey || '';
const getReferralKeySuccess = (state: HomeState): ReferralKeyResponse | null => state.referralKeyId || null;

const getDiscordAuthAttempting = (state: HomeState): boolean => state.actions.discordState || false;
const getDiscordAuthError = (state: HomeState): string => state.error.discordState || '';
const getDiscordAuthSuccess = (state: HomeState): null => state.discordSuccess || null;

const getTwitterAttempting = (state: HomeState): boolean => state.actions.twitter;
const getTwitterError = (state: HomeState): string => state.error.twitter;

const getRoleSelectAttempting = (state: HomeState): boolean => state.actions.roleSelect || false;
const getRoleSelectError = (state: HomeState): string => state.error.roleSelect || '';
const getRoleSelectSuccess = (state: HomeState): null => state.roleSelectSuccess || null;

const getRoleNumber = (state: HomeState): number | null => state.roleNumber || null;

const getAnswerAttempting = (state: HomeState): boolean => state.actions.answer || false;
const getAnswerError = (state: HomeState): string => state.error.answer || '';
const getAnswerSuccess = (state: HomeState): string | null => state.answerSuccess || null;

const getAnswerInputs = (state: HomeState): AnswerInput[] => state.answers || [];
const setCounterData = (state: HomeState): number => state.counter || 0;

const getSubmitEmailAttempting = (state: HomeState): boolean => state.actions.email || false;
const getSubmitEmailError = (state: HomeState): string => state.error.email || '';

const getSelectedLanguage = (state: HomeState): string => state.selectedLanguage || '';

export default {
    setLoader,

    getReferralKeyAttempting,
    getReferralKeyError,
    getReferralKeySuccess,

    getDiscordAuthAttempting,
    getDiscordAuthError,
    getDiscordAuthSuccess,

    getTwitterAttempting,
    getTwitterError,

    getRoleSelectAttempting,
    getRoleSelectError,
    getRoleSelectSuccess,
    getRoleNumber,

    getAnswerAttempting,
    getAnswerError,
    getAnswerSuccess,

    getAnswerInputs,
    setCounterData,

    getSubmitEmailAttempting,
    getSubmitEmailError,

    getSelectedLanguage,

};
