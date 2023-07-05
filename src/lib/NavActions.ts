import { push, replace, goBack } from 'redux-first-history';

import { store } from 'redux/store';

interface INavActionState {
    [key: string]: any;
}

const navPush = (routeName: string, state?: INavActionState): void => {
    store.dispatch(push({ pathname: routeName }, state));
};

const navBack = (): void => {
    store.dispatch(goBack());
};

const navReplace = (routeName: string) => {
    store.dispatch(replace(routeName));
};

const navResetToLogin = (): void => navReplace('/login');
const navToLangSelect = (): void => navPush('/');
const navToHome = (): void => navPush('/start');
const navToSelectRole = (): void => navPush('/role');
const navToAlreadySubmitted = (): void => navPush('/link/submitted');
const navToAlreadyApproved = (): void => navPush('/link/approved');
const navToAnswer = (roleNumber: number): void => navPush('/answer', { roleNumber });
const navToEmail = (): void => navPush('/email');
const navToThankYou = (): void => navPush('/thankYou');

export default {
    navBack,

    navResetToLogin,
    navToLangSelect,
    navToHome,
    navToSelectRole,
    navToAlreadySubmitted,
    navToAlreadyApproved,
    navToAnswer,
    navToEmail,
    navToThankYou,
};
