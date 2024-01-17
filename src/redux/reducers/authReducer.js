import * as types from "../const/const"

const InitialState = {
  Access_token: null,
  formone: {},
  formtwo: {},
  formthree: {},
  activation_token: null,
  profile: {},
  questionar: [],
  profileImage: null,
  language: "English",
  languageShort: "en",
  loginType: '',
};

const authReducer = (state = InitialState, action) => {
  switch (action.type) {
    case types.LOG_IN:
      return {
        ...state,
        Access_token: action.payload,
      };
    case types.PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case types.SOCIAL_PROFILE:
      return {
        ...state,
        profile: action.payload?.user,
        loginType: action?.payload?.type
      };
    // Signup/Registration
    case types.FORMONE:
      return {
        ...state,
        formone: action.payload,
      };
    case types.FORMTWO:
      return {
        ...state,
        formtwo: action.payload,
      };
    case types.FORMTHREE:
      return {
        ...state,
        formthree: action.payload,
      };
    case types.ACTIVATION_TOKEN:
      return {
        ...state,
        activation_token: action.payload,
      };
    case types.QUESTIONAR:
      return {
        ...state,
        questionar: action.payload,
      };
    case types.LANGUAGE:
      return {
        ...state,
        language: action.payload.language,
        languageShort: action.payload.languageShort,
      };
    case types.LOG_OUT:
      return {
        ...InitialState,
        language: state.language,
        languageShort: state.languageShort
      };
    default:
      return state;
  }
};

export default authReducer;
