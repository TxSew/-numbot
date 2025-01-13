const env = import.meta.env;

export const appConfig = {
    service: {
        api: 'https://wf96ndf0-8000.asse.devtunnels.ms/api' || 'https://wf96ndf0-8000.asse.devtunnels.ms/api',
    },
    url:{
        pathBotProgress: env.VITE_PATH_STATIC_NUMBOTS_BOT_PROGRESS_URL!,
        pathStaticMedia: env.VITE_PATH_PLAY_NUMBOTS_STATIC_MEDIA_URL!,
    }
};
