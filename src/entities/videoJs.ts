export interface IVideoJsOptions{
    autoplay: boolean;
    controls: boolean;
    responsive: boolean;
    fluid: boolean;
    sources: IVideoJsSources[];
}

export interface IVideoJsSources {
    src: string;
    type: string;
}
