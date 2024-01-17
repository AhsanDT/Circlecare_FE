import * as types from "../const/const"

const InitialState = {
    survey: [],
    daily_articles: [],
    daily_videos: [],
    discover_article: [],
    discover_video: [],
    care: [],
    support: null,
    chat: [],
    notifications: []
};

const surveyReducer = (state = InitialState, action) => {
    switch (action.type) {
        case types.SURVEY:
            return {
                ...state,
                survey: action.payload,
            };
        case types.DAILY_ARTICLES:
            return {
                ...state,
                daily_articles: action.payload,
            };
        case types.DAILY_VIDEOS:
            return {
                ...state,
                daily_videos: action.payload,
            };
        case types.DISCOVER_ARTICLES:
            return {
                ...state,
                discover_article: action.payload,
            };
        case types.DISCOVER_VIDEOS:
            return {
                ...state,
                discover_video: action.payload,
            };
        case types.CARE:
            return {
                ...state,
                care: action.payload,
            };
        case types.SUPPORT:
            return {
                ...state,
                support: action.payload,
            };
        case types.CHAT:
            return {
                ...state,
                chat: action.payload,
            };
        case types.NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload,
            };
        case types.LOG_OUT:
            return InitialState;
        default:
            return state;
    }
};

export default surveyReducer;
