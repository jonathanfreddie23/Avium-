import auth from 'redux/slices/auth/Selectors';
import home from 'redux/slices/home/Selectors';
import ui from 'redux/slices/ui/Selectors';
import { AnswerInput, ReferralKeyResponse } from './slices/home/types';

import { RootState } from './store';

const routerGetLocationState = (state: RootState): any => state.router.location?.state;

const authGetLoginAttempting = (state: RootState): boolean => auth.getLoginAttempting(state.auth);
const authGetLoginError = (state: RootState): string => auth.getLoginError(state.auth);

const getAuthAuthToken = (state: RootState): string => auth.getAuthToken(state.auth);

const setHomeLoader = (state: RootState): boolean => home.setLoader(state.home);

const homeGetReferralKeyAttempting = (state: RootState): boolean => home.getReferralKeyAttempting(state.home);
const homeGetReferralKeyError = (state: RootState): string => home.getReferralKeyError(state.home);
const homeGetReferralKeySuccess = (state: RootState): ReferralKeyResponse | null => home.getReferralKeySuccess(state.home);

const homeGetTwitterAttempting = (state: RootState): boolean => home.getTwitterAttempting(state.home);
const homeGetTwitterError = (state: RootState): string => home.getTwitterError(state.home);

const homeDiscordAuthAttempting = (state: RootState): boolean => home.getDiscordAuthAttempting(state.home);
const homeDiscordAuthError = (state: RootState): string => home.getDiscordAuthError(state.home);
const homeDiscordAuthSuccess = (state: RootState): null => home.getDiscordAuthSuccess(state.home);

const homeRoleSelectAttempting = (state: RootState): boolean => home.getRoleSelectAttempting(state.home);
const homeRoleSelectError = (state: RootState): string => home.getRoleSelectError(state.home);
const homeRoleSelectSuccess = (state: RootState): null => home.getRoleSelectSuccess(state.home);
const getHomeRoleNumber = (state: RootState): number | null => home.getRoleNumber(state.home);

const homeAnswerAttempting = (state: RootState): boolean => home.getAnswerAttempting(state.home);
const homeAnswerError = (state: RootState): string => home.getAnswerError(state.home);
const homeAnswerSuccess = (state: RootState): string | null => home.getAnswerSuccess(state.home);

const homeGetAnswerInput = (state: RootState): AnswerInput[] => home.getAnswerInputs(state.home);
const homeSetCounterData = (state: RootState): number => home.setCounterData(state.home);

const homeGetSubmitEmailAttempting = (state: RootState): boolean => home.getSubmitEmailAttempting(state.home);
const homeGetSubmitEmailError = (state: RootState): string => home.getSubmitEmailError(state.home);

const getUiSelectedLanguage = (state: RootState): string => home.getSelectedLanguage(state.home);
const getUiHomeStage = (state: RootState): number => ui.getHomeStage(state.ui);

export default {
    routerGetLocationState,

    authGetLoginAttempting,
    authGetLoginError,

    getAuthAuthToken,

    setHomeLoader,

    homeGetReferralKeyAttempting,
    homeGetReferralKeyError,
    homeGetReferralKeySuccess,

    homeGetTwitterAttempting,
    homeGetTwitterError,

    homeDiscordAuthAttempting,
    homeDiscordAuthError,
    homeDiscordAuthSuccess,

    homeRoleSelectAttempting,
    homeRoleSelectError,
    homeRoleSelectSuccess,
    getHomeRoleNumber,

    homeAnswerAttempting,
    homeAnswerError,
    homeAnswerSuccess,

    homeGetAnswerInput,
    homeSetCounterData,

    homeGetSubmitEmailAttempting,
    homeGetSubmitEmailError,

    getUiSelectedLanguage,
    getUiHomeStage,
};
