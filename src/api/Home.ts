import { ApiResponse } from 'apisauce';

import { GatewayResponse } from 'api/types/types';

import { AnswerSubmissionConfirmationParams, AnswerSubmissionParams, AnswerFileSubmissionParams, DiscordAuthParams, IHomeGateway, ReferralKeyActionParams, ReferralKeyResponse, RoleSelectParams, SubmitEmailParams, GetTwitterLinkResponse, TwitterLinkParams } from './HomeBase';

export default class HomeGateway extends IHomeGateway {
    async getReferralKey(params: ReferralKeyActionParams): GatewayResponse<ReferralKeyResponse> {
        const { id, recaptchaValue } = params;
        const response: ApiResponse<ReferralKeyResponse> = await this.api.get(`/referral/validate/${id}`, { recaptchaValue });
        return this.process(response);
    }

    async linkingDiscord(params: DiscordAuthParams): GatewayResponse<null> {
        const { code, submissionId } = params;
        const response: ApiResponse<null> = await this.api.post('/linking/discord', { code, submissionId });
        return this.process(response);
    }

    async getTwitterLink(): GatewayResponse<GetTwitterLinkResponse> {
        const response: ApiResponse<GetTwitterLinkResponse> = await this.api.get('/linking/twitterLink');
        return this.process(response);
    }

    async linkingTwitter(params: TwitterLinkParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.post('/linking/twitter', params);
        return this.process(response);
    }

    async roleSelect(params: RoleSelectParams): GatewayResponse<null> {
        const { id, roleSelected } = params;
        const response: ApiResponse<null> = await this.api.put('/submission/role', { id, roleSelected });
        return this.process(response);
    }

    async answerSubmission(params: AnswerSubmissionParams): GatewayResponse<string | null> {
        const { id, questionIndex, answer } = params;
        const response: ApiResponse<string | null> = await this.api.post('/submission/answer', { id, questionIndex, answer });
        return this.process(response);
    }

    async answerFileSubmission(params: AnswerFileSubmissionParams): GatewayResponse<string | null> {
        const { id, questionIndex, answer, file } = params;
        const formData = new FormData();

        const index = questionIndex.toString();

        formData.append('id', id);
        formData.append('answer', answer);
        formData.append('questionIndex', index);
        formData.append('file', file);

        const response: ApiResponse<string | null> = await this.api.post('/submission/answerFile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return this.process(response);
    }

    async answerSubmissionConfirmation(params: AnswerSubmissionConfirmationParams): GatewayResponse<string | null> {
        const { id } = params;
        const response: ApiResponse<string | null> = await this.api.post('/submission/submit', { id });
        return this.process(response);
    }

    async submitEmail(params: SubmitEmailParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.post('/submission/email', params);
        return this.process(response);
    }
}
