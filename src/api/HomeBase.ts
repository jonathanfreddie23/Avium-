import Gateway from 'api/types/Gateway';
import { GatewayResponse } from 'api/types/types';

export interface ReferralKeyActionParams {
    id: string;
    recaptchaValue: string;
}

export interface ReferralKeyResponse {
    submissionId: string;

}

export interface DiscordAuthParams {
    submissionId: string;
    code: string
}

export interface RoleSelectParams {
    id: string;
    roleSelected: number
}

export interface AnswerSubmissionParams {
    id: string;
    questionIndex: number;
    answer: string;
}

export interface AnswerFileSubmissionParams {
    id: string;
    questionIndex: number;
    answer: string;
    file: File;
}

export interface AnswerSubmissionConfirmationParams {
    id: string;
}

export interface SubmitEmailParams {
    id: string;
    email: string;
}

export interface GetTwitterLinkResponse {
    url: string;
    oauthToken: string;
    oauthTokenSecret: string;
    oauthCallbackConfirmed: string;
}

export interface TwitterLinkParams {
    submissionId: string;
    oauthToken: string;
    oauthTokenSecret: string;
    oauthVerifier: string;
}

export abstract class IHomeGateway extends Gateway {
    abstract getReferralKey(params: ReferralKeyActionParams): GatewayResponse<ReferralKeyResponse | null>;

    abstract linkingDiscord(params: DiscordAuthParams): GatewayResponse<null>;

    abstract getTwitterLink(): GatewayResponse<GetTwitterLinkResponse>;

    abstract linkingTwitter(params: TwitterLinkParams): GatewayResponse<null>;

    abstract roleSelect(params: RoleSelectParams): GatewayResponse<null>;

    abstract answerSubmission(params: AnswerSubmissionParams): GatewayResponse<string | null>;

    abstract answerFileSubmission(params: AnswerSubmissionParams): GatewayResponse<string | null>;

    abstract answerSubmissionConfirmation(params: AnswerSubmissionConfirmationParams): GatewayResponse<string | null>;

    abstract submitEmail(email: SubmitEmailParams): GatewayResponse<null>;
}
