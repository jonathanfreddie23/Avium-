export default {
    env: process.env.REACT_APP_ENV,
    baseUrl: process.env.REACT_APP_BASE_URL,
    clientId: process.env.REACT_APP_BASE_CLIENT_ID,

    discordCallbackUrl: process.env.REACT_APP_DISCORD_CALLBACK_URL,

    recaptchaSiteKey: process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY as string,
};
