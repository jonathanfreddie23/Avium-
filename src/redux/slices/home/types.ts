import { PayloadAction } from '@reduxjs/toolkit';

import { QuestionTypeEnum } from 'entities/questions';

export interface AnswerInput {
    index: number;
    answer: string;
    fileName?: string;
}

export interface HomeReduxState {
    actions: {
        referralKey: boolean;
        discordState: boolean;
        twitter: boolean;
        roleSelect: boolean;
        answer: boolean;
        email: boolean;
    },
    cancel: boolean;
    referralKeyId: ReferralKeyResponse | null;
    discordSuccess: null;
    roleSelectSuccess: null;
    roleNumber: number | null;
    answerSuccess: string | null;
    answers: AnswerInput[],
    counter: number,
    selectedLanguage: string,
    error: {
        referralKey: string;
        discordState: string;
        twitter: string;
        roleSelect: string;
        answer: string;
        email: string;
    },
}

export type ReferralKeyActionPayload = PayloadAction<{
    id: string;
    recaptchaValue: string | null;
}>

export interface ReferralKeyResponse {
    submissionId: string;

}

export type DiscordActionPayload = PayloadAction<{
    code: string;
}>

export type TwitterActionPayload = PayloadAction<{
    token: string;
    verifier: string;
}>

export type RoleSelectActionPayload = PayloadAction<{
    roleSelected: number;
}>

export type AnswerActionPayload = PayloadAction<{
    index: number;
    questionType: QuestionTypeEnum;
    answer: string;
    answerFile: File | null;
    isLastQuestion: boolean;
}>

export type AnswerSubmissionPayload = PayloadAction<{
    id: string;
}>

export type SubmitEmailPayload = PayloadAction<{
    email: string;
}>
