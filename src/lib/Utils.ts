type Status = 'Success' | 'Failed';

interface LinkingStatus {
    discord: boolean;
    twitter: boolean;
}

interface TwitterData {
    oauthTokenSecret: string;
}

export interface TwitterDataResponse {
    oauthTokenSecret: string | null;
}

const Auth = {
    storeAuthToken: (authToken: string): void => {
        localStorage.setItem('authToken', authToken);
    },
    getAuthToken: (): string | null => {
        return localStorage.getItem('authToken');
    },
    clearAuthToken: (): void => {
        localStorage.removeItem('authToken');
    },
};

const LocalStorage = {
    getItem<T>(key: string): T | null {
        const storageItem = localStorage.getItem(key);

        if (!storageItem) return null;

        return JSON.parse(storageItem);
    },
    setItem: (key: string, item: any | null): Status => {
        if (!item) return 'Failed';
        const parse = JSON.stringify(item);

        localStorage.setItem(key, parse);
        return 'Success';
    },
    removeItem: (key: string): void => {
        localStorage.removeItem(key);
    },
};

const Linking = {
    setDiscordLinked: (): void => {
        sessionStorage.setItem('discordLink', 'true');
    },
    setTwitterLinked: (): void => {
        sessionStorage.setItem('twitterLink', 'true');
    },
    setTwitterData: (params: TwitterData): void => {
        const { oauthTokenSecret } = params;
        sessionStorage.setItem('otnst', oauthTokenSecret);
    },
    getTwitterData: (): TwitterDataResponse => {
        const oauthTokenSecret = sessionStorage.getItem('otnst');

        return {
            oauthTokenSecret,
        };
    },
    getLinkingStatus: (): LinkingStatus => {
        const discord = sessionStorage.getItem('discordLink');
        const twitter = sessionStorage.getItem('twitterLink');

        return {
            discord: discord === 'true',
            twitter: twitter === 'true',
        };
    },
    clearLinkingStatus: (): void => {
        sessionStorage.removeItem('discordLink');
        sessionStorage.removeItem('twitterLink');
        sessionStorage.removeItem('otnst');
    },
};

const Video = {
    setVideoWatched: (): void => {
        sessionStorage.setItem('vid', 'true');
    },
    getVideoWatched: (): boolean => {
        const videoWatched = sessionStorage.getItem('vid');

        if (!videoWatched) return false;
        return videoWatched === 'true';
    },
    clearVideoWatched: (): void => {
        sessionStorage.removeItem('vid');
    },
};

export default {
    Auth,
    LocalStorage,
    Linking,
    Video,
};
